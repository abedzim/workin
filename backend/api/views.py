from django.contrib.auth import (
        login as auth_login,
        logout as auth_logout,
        get_user_model,
        )
from django.contrib.auth.models import User
from django_countries import countries
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import default_token_generator
from rest_framework.authtoken.models import Token
from django.template import loader
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from rest_framework import generics, mixins, permissions, status
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework import exceptions
from rest_framework import viewsets
from rest_framework.decorators import action

from userena import settings as userena_settings
from userena import signals as userena_signals

from profiles.models import Profile
from share.models import  Share
from jobs.models import Post

from .permissions import IsNotAuthenticated, IsOwnerOrReadOnly, IsAdminUserOrReadOnly, IsSameUserAllowEditionOrReadOnly
from .serializers import (
    SignInSerializer,
    SignInRememberMeSerializer,
    SignUpSerializer,
    SignUpOnlyEmailSerializer,
    PasswordResetSerializer,
    PasswordSetSerializer,
    PasswordChangeSerializer,
    EmailChangeSerializer,
    CreateProfileSerializer,
    PostSerializer,
    UserSerializer,
    JobSerializer
    )
from .mixins import SecureRequiredMixin
from .helpers import get_user_serializer_class
from .settings import API_MESSAGE_KEY


User = get_user_model()


class SignUpView(SecureRequiredMixin, generics.GenericAPIView):
    allowed_methods = ['post']

    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny, )
    serializer_class = SignUpSerializer  # overriden in get_serializer_class

    def check_permissions(self, request):
        if userena_settings.USERENA_DISABLE_SIGNUP:
            raise exceptions.PermissionDenied(
                _('Sign up is currently disabled.')
                )

        return super(SignUpView, self).check_permissions(request)

    def get_serializer_class(self):
        if userena_settings.USERENA_WITHOUT_USERNAMES:
            return SignUpOnlyEmailSerializer
        return self.serializer_class

    def send_signup_signal(self, new_user):
        # Send the signup complete signal
        userena_signals.signup_complete.send(sender=None,
                                             user=new_user)

    def signout_signin(self, request, new_user, force_signin=False):
        # A new signed user should logout the old one.
        if request.user.is_authenticated:
            auth_logout(request)

        signed_in = False
        if ((userena_settings.USERENA_SIGNIN_AFTER_SIGNUP and
            not userena_settings.USERENA_ACTIVATION_REQUIRED) or
            force_signin):
            new_user = authenticate(
                identification=new_user.email,
                check_password=False,
                )
            auth_login(request, new_user)
            userena_signals.account_signin.send(sender=None, user=new_user)
            signed_in = True


        return signed_in

    def post(self, request, format=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():
            new_user = serializer.save()
            token = Token.objects.get(user=new_user)
            self.send_signup_signal(new_user)
            signed_in = self.signout_signin(request, new_user)

            return Response({
                API_MESSAGE_KEY: _('Signed up successfully.'),
                'username': new_user.username,
                'signed_in': signed_in,
                'token': token.key,
                })

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class SignInView(SecureRequiredMixin, generics.GenericAPIView):
    allowed_methods = ['post']

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsNotAuthenticated, )
    serializer_class = SignInSerializer

    def set_session_expiry(self, request):
        request.session.set_expiry(0)

    def post(self, request, format=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.instance
            auth_login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            self.set_session_expiry(request)

            # send a signal that a user has signed in
            userena_signals.account_signin.send(sender=None, user=user)

            return Response({
                'user': get_user_serializer_class()(user).data,
                "token": token.key
                })

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def permission_denied(self, request):
        raise exceptions.PermissionDenied(_("Already authenticated."))


class SignInRememberMeView(SignInView):
    serializer_class = SignInRememberMeSerializer

    def set_session_expiry(self, request):
        if request.data.get('remember_me'):
            request.session.set_expiry(
                userena_settings.USERENA_REMEMBER_ME_DAYS[1] * 86400
                )
        else:
            request.session.set_expiry(0)


class SignOutView(SecureRequiredMixin, APIView):
    allowed_methods = ['post']

    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny, )

    def post(self, request, format=None):
        auth_logout(request)
        userena_signals.account_signout.send(sender=None, user=request.user)
        return Response({
            API_MESSAGE_KEY: _('Signed out successfully.')
            })


class PasswordResetView(SecureRequiredMixin, generics.GenericAPIView):
    allowed_methods = ['post']

    authentication_classes = (TokenAuthentication, SessionAuthentication)
    serializer_class = PasswordResetSerializer

    token_generator = default_token_generator
    subject_template_name = "registration/password_reset_subject.txt"
    email_template_name = "registration/password_reset_email.html"
    html_email_template_name = None
    # from_email is settings.DEFAULT_FROM_EMAIL by default
    # (that will be used
    from_email = None

    def post(self, request, format=None):
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.DATA)

        domain_override = None  # used by admin?
        token_generator = self.token_generator
        use_https = request.is_secure()

        if serializer.is_valid():
            email = serializer.data.get('email')
            active_users = User._default_manager.filter(
                    email__iexact=email, is_active=True)
            for user in active_users:
                # Make sure that no email is sent to a user that actually has
                # a password marked as unusable
                if not user.has_usable_password():
                    continue
                if not domain_override:
                    current_site = get_current_site(request)
                    site_name = current_site.name
                    domain = current_site.domain
                else:
                    site_name = domain = domain_override
                c = {
                    'email': user.email,
                    'domain': domain,
                    'site_name': site_name,
                    'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                    'user': user,
                    'token': token_generator.make_token(user),
                    'protocol': 'https' if use_https else 'http',
                }
                subject = loader.render_to_string(self.subject_template_name, c)
                # Email subject *must not* contain newlines
                subject = ''.join(subject.splitlines())
                email = loader.render_to_string(self.email_template_name, c)

                if self.html_email_template_name:
                    html_email = loader.render_to_string(
                            self.html_email_template_name, c
                            )
                else:
                    html_email = None

                send_mail(
                    subject, email, self.from_email,
                    [user.email], #html_message=html_email,
                    )

            return Response({
                    API_MESSAGE_KEY: _(
                        "We've emailed you instructions for setting your "
                        "password. You should be receiving them shortly."
                        "If you don't receive an email, please make sure "
                        "you've entered the address you registered with, "
                        "and check your spam folder."
                        )
                    })

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class PasswordSetView(SecureRequiredMixin, generics.GenericAPIView):
    allowed_methods = ['post']  # or should this be a PUT?
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = PasswordSetSerializer

    def post(self, request, format=None):
        user = request.user
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.data, instance=user)

        if serializer.is_valid():
            serializer.save()  # saves user
            userena_signals.password_complete.send(sender=None,
                                                   user=user)
            return Response({
                API_MESSAGE_KEY: _("Password successfully changed.")
                })

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class PasswordChangeView(PasswordSetView):
    serializer_class = PasswordChangeSerializer


class EmailChangeView(SecureRequiredMixin, generics.GenericAPIView):
    allowed_methods = ['post']  # or should this be a PUT?
    authentication_classes = (TokenAuthentication, SessionAuthentication)
    permission_classes = (IsAuthenticated,)
    serializer_class = EmailChangeSerializer

    def post(self, request, format=None):
        user = request.user
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(data=request.DATA, instance=user)

        if serializer.is_valid():
            # serializer.save()  # saves user
            return Response({
                'email': user.email,
                'email_unconfirmed': user.userena_signup.email_unconfirmed,
                API_MESSAGE_KEY: _("Confirmation email has been sent.")
                })

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    allowed_methods = ['get']
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(CurrentUserView, self).dispatch(*args, **kwargs)

    def get(self, request, format=None):
        ret = {}
        user = request.user
        if user.is_authenticated:
            ret = get_user_serializer_class()(user).data
        return Response(ret)

class AccountViewSet(viewsets.ModelViewSet):
    allowed_methods = ['get']
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        if self.request.query_params.get("search", None):
            params = self.request.query_params.get("search", None)
            return User.objects.filter( Q(username__icontains=params)|
                                        Q(major__icontains=params)|
                                        Q(first_name__icontains=params)
                                    )
        if self.kwargs.get('pk') is None:
            return User.objects.all()
        user_id = int(self.kwargs['pk'])
        if self.request.user.id != user_id:
            target_user = User.objects.get(id=user_id)
        return User.objects.all()

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = CreateProfileSerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,
                          IsOwnerOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CountryListView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request, *args, **kwargs):
        return Response(countries, status=HTTP_200_OK)

class PostViewSet(viewsets.ModelViewSet):
    queryset = Share.objects.all()
    serializer_class = PostSerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FollowUser(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, user_id, format=None):
        user = request.user
        user_profile = Profile.objects.get(user=user)
        print(user_profile)
        try:
            user_to_follow = User.objects.get(id=user_id)
            print(user_to_follow)
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if user_to_follow not in user_profile.following.all():
            user_profile.following.add(user_to_follow)
            user_profile.save()

            user_to_follow.profile.followers.add(user)
            user_to_follow.save()

            return Response({
                "status": "Success",
                "message": "You followed " + user_to_follow.username,
                "am_i_following": True
            }, status=HTTP_200_OK)

class UnfollowUser(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, user_id, format=None):
        user = request.user
        user_profile = Profile.objects.get(user=user)
        try:
            user_to_unfollow = User.objects.get(id=user_id)
        except Profile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if user_to_unfollow in user_profile.following.all():
            user_profile.following.remove(user_to_unfollow)
            user_profile.save()

            user_to_unfollow.profile.followers.remove(user)
            user_to_unfollow.save()

            return Response(status=HTTP_200_OK)

class Like(APIView):
    """Function view to receive AJAX, returns the count of likes a given news
    has recieved."""
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
    def post(self, request, post_id, format=None):

        #my_id = request.POST['news']
        news = Share.objects.get(pk=post_id)
        user = request.user
        news.switch_like(user)
        return Response({"likes": news.count_likers()})

class UserFollowers(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id, format=None):

        try:
            found_user = User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_followers = found_user.profile.followers.all()

        serializer = UserSerializer(user_followers, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class UserFollowing(APIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request, user_id, format=None):

        try:
            found_user = User.objects.get(id=user_id)
        except models.User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        user_following = found_user.profile.following.all()

        serializer = UserSerializer(user_following, many=True, context={"request": request})

        return Response(data=serializer.data, status=status.HTTP_200_OK)

class JobView(viewsets.ModelViewSet):
    allowed_methods = ['get']
    queryset = Post.objects.all()
    serializer_class = JobSerializer
    authentication_classes = (TokenAuthentication, SessionAuthentication,)
    permission_classes = (IsAuthenticated,)
