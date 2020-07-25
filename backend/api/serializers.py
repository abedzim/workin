import random
try:
    from hashlib import sha1 as sha_constructor
except ImportError:
    from django.utils.hashcompat import sha_constructor

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.forms import widgets
from userena.utils import signin_redirect, get_profile_model, get_user_profile

from userena.models import UserenaSignup
from userena import settings as userena_settings
from profiles.models import Profile
from users_infos.models import  Education, Experience, Skill
from about_me.models import Overview, Skills
from share.models import Share
from jobs.models import Post

from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.validators import UniqueValidator

from .settings import USERNAME_RE, PASSWORD_MIN_LENGTH

from rest_framework.authtoken.models import Token
from django_countries.serializer_fields import CountryField
from django_countries import Countries
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)



User = get_user_model()
PASSWORD_MAX_LENGTH = User._meta.get_field('password').max_length


class ChoicesSerializerField(serializers.SerializerMethodField):
    """
    A read-only field that return the representation of a model field with choices.
    """

    def to_representation(self, value):
        # sample: 'get_XXXX_display'
        method_name = 'get_{field_name}_display'.format(field_name=self.field_name)
        # retrieve instance method
        method = getattr(value, method_name)
        # finally use instance method to return result of get_XXXX_display()
        return method()

class SerializableCountryField(serializers.ChoiceField):
    def __init__(self, **kwargs):
        super(SerializableCountryField, self).__init__(choices=Countries())

    def to_representation(self, value):
        if value in ('', None):
            return ''
        return super(SerializableCountryField, self).to_representation(value)

class OverviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Overview
        exclude = ('auteur',)

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        exclude = ('auteur',)

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        exclude = ('auteur',)


class SkillSerializer(serializers.ModelSerializer):

    class Meta:
        model = Skills
        Exclude = ('auteur',)

class ProfileSerializer(serializers.ModelSerializer):
    location = SerializableCountryField(allow_blank=True)
    gender = serializers.SerializerMethodField()
    mugshot = serializers.ImageField()
    class Meta:
        model = Profile
        fields = ('id','mugshot','get_mugshot_url','get_full_name_or_username','privacy','language','gender','location', 'website','birth_date','about_me','followers','following','age', 'get_number_of_followers', 'get_number_of_following')

    def get_gender(self, obj):
        return obj.get_gender_display()




class SignInSerializer(serializers.Serializer):
    identification = serializers.CharField(
        max_length=User._meta.get_field('email').max_length
        )
    password = serializers.CharField(
        style={'input_type': 'password'},
        )
    profile = ProfileSerializer(many=False, read_only=True)
    
    #Uprofile = serializers.PrimaryKeyRelatedField(queryset=Profile.objects.all())

    def validate(self, attrs):
        user = authenticate(
            identification=attrs.get('identification'),
            password=attrs.get('password'),
            )

        if user is not None:
            if user.is_active:
                self.instance = user
            else:
                raise serializers.ValidationError(
                    _("The account is currently inactive.")
                    )
        else:
            error = _(
                "Invalid credentials. "
                "Note that both fields are case-sensitive."
                )
            raise serializers.ValidationError(error)

        return attrs


class SignInRememberMeSerializer(SignInSerializer):
    remember_me = serializers.BooleanField(
        default=False,
        )


class PasswordSetSerializer(serializers.Serializer):
    """
    A serializer that lets a user change set his/her password without entering the
    old password.
    """
    default_error_messages = dict(serializers.Serializer.default_error_messages, **{
        u'password_mismatch': _("The two password fields didn't match."),
    })

    password1 = serializers.CharField(
        label=_("New password"),
        style={'input_type': 'password'},
        min_length=PASSWORD_MIN_LENGTH,
        max_length=PASSWORD_MAX_LENGTH,
        )
    password2 = serializers.CharField(
        label=_("New password (again)"),
        style={'input_type': 'password'},
        )

    def validate_password2(self, attrs, source):

        password2 = attrs.get(source)
        password1 = attrs.get('password1')
        if password1 and password2:
            if password1 != password2:
                raise serializers.ValidationError(
                    self.error_messages['password_mismatch']
                )
        return attrs

    def update(self, attrs, instance=None):
        assert instance is not None, 'Only update is allowed'
        if instance is not None:
            instance.set_password(attrs.get('password1'))
            return instance


class PasswordChangeSerializer(PasswordSetSerializer):
    """
    A serializer that lets a user change his/her password by entering
    their current password.
    """
    default_error_messages = dict(PasswordSetSerializer.default_error_messages, **{
        u'password_incorrect': _("Your current password was entered incorrectly. "
                                "Please enter it again."),
    })

    current_password = serializers.CharField(
        label=_("Current Password"),
        style={'input_type': 'password'},
        )

    def validate_current_password(self, attrs, source):
        user = self.object
        password = attrs.get(source)

        if not user.check_password(password):
            raise serializers.ValidationError(
                self.error_messages['password_incorrect']
                )

        return attrs


class SignUpSerializer(serializers.Serializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    username = serializers.CharField(
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    password1 = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        min_length=PASSWORD_MIN_LENGTH,
        max_length=PASSWORD_MAX_LENGTH,
        )
    password2 = serializers.CharField(
        label=_("Password Again"),
        style={'input_type': 'password'},
        # min_length=PASSWORD_MIN_LENGTH,
        # max_length=PASSWORD_MAX_LENGTH,
        )

    

    def validate(self, attrs):
        """
        Validates that the values entered into the two password fields match.
        Note that an error here will end up in ``non_field_errors()`` because
        it doesn't apply to a single field.
        """
        if 'password1' in attrs and 'password2' in attrs:
            if attrs['password1'] != attrs['password2']:
                raise serializers.ValidationError(
                    _('The two password fields didn\'t match.')
                    )
        return attrs

    def create_user(self, username, email, password):
        return UserenaSignup.objects.create_user(
            username,
            email,
            password,
            active=not userena_settings.USERENA_ACTIVATION_REQUIRED,
            send_email=userena_settings.USERENA_ACTIVATION_REQUIRED,
            )

    def create(self, attrs, instance=None):
        """
        Instantiate a new User instance.
        """
        assert instance is None, 'Cannot update users with SignupSerializer'

        username, email, password = (
            attrs['username'],
            attrs['email'],
            attrs['password1'],
            )

        user = self.create_user(username, email, password)
        self.instance = user
        Token.objects.create(user=user)

        return user


class SignUpOnlyEmailSerializer(SignUpSerializer):

    def construct_username(self):
        """ Generate a random username"""
        while True:
            username = sha_constructor(str(random.random())).hexdigest()[:5]
            if not User.objects.get(username__iexact=username).exists():
                return username

    def restore_object(self, attrs, instance=None):
        attrs['username'] = self.construct_username()
        return super(SignUpOnlyEmailSerializer, self).restore_object(attrs, instance)


class SignUpTosSerializerMixin(object):
    tos = serializers.BooleanField(
        label=_('I have read and agree to the Terms of Service'),
        error_messages={'required': _('You must agree to the terms to register.')}
        )


class SignUpTosSerializer(SignUpTosSerializerMixin, SignUpSerializer):
    pass


class SignUpOnlyEmailTosSerializer(SignUpTosSerializerMixin, SignUpOnlyEmailSerializer):
    pass


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class EmailChangeSerializer(serializers.Serializer):
    default_error_messages = dict(serializers.Serializer.default_error_messages, **{
        u'already_known': _(u"You're already known under this email."),
        u'already_in_use': _(u"This email is already in use. Please supply a different email.")
    })

    email = serializers.EmailField(
        label=_("New email"),
        max_length=User._meta.get_field('email').max_length,
    )

    def validate_email(self, attrs, source):
        """ Validate that the email is not already registered with another user """
        user = self.object
        email = attrs[source]

        if email.lower() == user.email:
            raise serializers.ValidationError(self.error_messages['already_known'])

        query = User.objects.filter(email__iexact=email)\
                            .exclude(email__iexact=user.email)
        if query.exists():
            raise serializers.ValidationError(self.error_messages['already_in_use'])

        return attrs

    def restore_object(self, attrs, instance):
        """
        Save method calls :func:`user.change_email()` method which sends out an
        email with an verification key to verify and with it enable this new
        email address.
        """
        assert instance is not None, 'Only update is allowed'
        user = instance
        email = attrs['email']
        if instance is not None:
            user.userena_signup.change_email(email)
            return instance

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(many=False, read_only=True)
    experience = ExperienceSerializer(many=True, read_only=True)
    education = EducationSerializer(many=True, read_only=True)
    overview = OverviewSerializer(many=True, read_only=True)
    skill = SkillSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'profile','overview','experience','education','skill')

class CreateProfileSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    gender = serializers.SerializerMethodField(read_only=False)

    class Meta:
        model = Profile
        fields = ('id', 'user', 'username', 'first_name', 'last_name', 'mugshot', 'privacy','language','gender', 'website','birth_date','about_me',)

    def get_gender(self, obj):
        return obj.get_gender_display()

    def create(self, validated_data):

        return Profile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        # retrieve the User
        user_data = validated_data.pop('user', None)
        for attr, value in user_data.items():
            setattr(instance.user, attr, value)

        # retrieve Profile
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.user.save()
        instance.save()
        return instance

class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(default=serializers.CurrentUserDefault(), read_only=True)
    image = serializers.ImageField(max_length=None, use_url=True, required=False, allow_empty_file=True)

    class Meta:
        model = Share
        fields = [
            'id',
            'user',
            'content',
            'image',
            'liked',
            'timestamp',
            'count_thread',
            'count_likers'
        ]

class JobSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    #category = serializers.SerializerMethodField(read_only=False)
    job_type = serializers.SerializerMethodField(read_only=False)
    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'slug', 'category',
                  'job_type', 'price', 'content', 'timestamp')

    #def get_category(self, obj):
        #return obj.get_category_display()

    def get_job_type(self, obj):
        return obj.get_job_type_display()



