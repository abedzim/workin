try:
    from urllib.parse import quote_plus #python 3
except: 
    pass
import requests 
from django.contrib import messages
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login as auth_login
from annoying.decorators import ajax_request
import datetime
from xml.etree import cElementTree

from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
# from haystack.generic_views import FacetedSearchView as BaseFacetedSearchView
from django.db.models import Count
# from haystack.query import SearchQuerySet
from django.http import JsonResponse
from django.views.generic import UpdateView
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required
from django.conf import settings
from userena.utils import signin_redirect, get_profile_model, get_user_profile
import json

from django.contrib.syndication.views import Feed
from django.shortcuts import *
from jet.dashboard import modules
from notifications.models import Notification
try:
    from django.contrib.auth import get_user_model
    user_model = get_user_model()
except ImportError:
    from django.contrib.auth.models import User
    user_model = User

from django.shortcuts import render, get_object_or_404, redirect

#from friendship.exceptions import AlreadyExistsError
#from friendships.models import Friend, Follow, FriendshipRequest, Block
from users_infos.forms import ExperienceForm, EducationForm
#from news.models import News
from users_infos.models import Experience, Education, Overview, Skill
from django.views.generic import ListView, DeleteView

from posts.models import PPost
from profiles.models import Profile

from share.models import Share
from django.db.models import Count

from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer

from notifications.models import Notification, notification_handler

get_friendship_context_object_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_NAME', 'user')
get_friendship_context_object_list_name = lambda: getattr(settings, 'FRIENDSHIP_CONTEXT_OBJECT_LIST_NAME', 'users')


def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about-us.html')

def terms(request):
    return render(request, 'terms-conditions')

@login_required
def welcome(request):
    user = request.user
    #following = Follow.objects.following(user)
    #followers = Follow.objects.followers(user)
    #nb_following = len(following)
    #nb_followers = len(followers)
    # msg = Post.objects.filter(user__in=following)
    response = requests.get('https://www.bfmtv.com/rss/info/flux-rss/flux-toutes-les-actualites/')
    parsed_xml = cElementTree.fromstring(response.content)
    print (parsed_xml.iter())
    items = []
    
    notifs = request.user.notifications.unread().count() 
    
    print (notifs) 

    ppost = PPost.objects.all()
    user_f = request.user
    user_profile = get_user_profile(user=user_f)
    profiles = user_profile.following.all()
    alls = Share.objects.filter(reply=False, user__in=profiles)
    nwnw = Share.objects.filter(reply=False, user=user_f)
    nws = alls.union(nwnw).order_by('-timestamp')
    
    for node in parsed_xml.iter():
        if node.tag == 'item':
            item = {}
            for item_node in list(node):
                if item_node.tag == 'title':
                    item['title'] = item_node.text
                if item_node.tag == 'link':
                    item['link'] = item_node.text
                if item_node.tag == 'description':
                    item['description'] = item_node.text
                #if item_node.tag == 'pubDate':
                    #item['item_pubdate'] == item_node.text
            items.append(item)
            
    #msg = Post.objects.all()
    # form = PostForm(request.POST or None, request.FILES or None)
    # if form.is_valid():
    #     instance = form.save(commit=False)
    #     instance.user = user
    #     instance.save()
    #     # message success
    #     messages.success(request, "Successfully Created")
        
    #     return redirect('welcome')
    
    context = {#"form": form,
               #'nb_following':nb_following,
               #'nb_followers':nb_followers,
            #    'msg':msg,
               'nws':nws,
               'ppost':ppost,
               'items':items[:3],
               'notifs':notifs
               }
##	return render(request, "welcome.html", context)
    return render(request, 'home1.html',context)
        
    
###########################################################

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            auth_login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

###########################################################

def autocomplete(request):
    sqs = SearchQuerySet().autocomplete(
        content_auto=request.GET.get(
            'query',
            ''))[
        :5]
    s = []
    for result in sqs:
        d = {"value": result.username}
        s.append(d)
        
    output = {'suggestions': s}
    print(output)
    print(s)
    return JsonResponse(output)

# class FacetedSearchView(BaseFacetedSearchView):
#     form_class = FacetedPersonSearchForm
#     facet_fields = ['username']
#     template_name = 'profils.html'
#     #paginate_by = 3
#     context_object_name = 'object_list'

#     def get_context_data(self, **kwargs):
#         #self.user = self.request.user
#         context = super().get_context_data(**kwargs)
#         context['following'] = Follow.objects.following(self.request.user)
#         return context
    

@login_required
def show_profile(request):
    user = request.user
    nws = News.objects.all()
    exp = Experience
    ed = Education
    nn = News
    overview = Overview.objects.all()
    if 'userToShow' in request.GET and request.GET['userToShow'] != '':
        user_to_show_username = request.GET['userToShow']
        result = User.objects.filter(username=user_to_show_username)
        if len(result) == 1:
            if User.objects.filter(username=user_to_show_username):
                user_to_show = User.objects.get(username=user_to_show_username)
                following = Follow.objects.following(user_to_show)
                followers = Follow.objects.followers(user_to_show)
                nb_following = len(following)
                nb_followers = len(followers)
                form = ExperienceForm()
                #forma = EducationForm()

            return render(request, 'show_profile.html', {'user_to_show':user_to_show,
                                                         'nb_following':nb_following,
                                                        'nb_followers':nb_followers,
                                                         'following':following,
                                                         'followers':followers,
                                                         'ed':ed,
                                                         'overview':overview,
                                                         'nws':nws})
        else:
            return render(request, 'show_profile.html', {'user_to_show':user_to_show,
                                                         'nb_following':nb_following,
                                                        'nb_followers':nb_followers,
                                                         'following':following,
                                                         'followers':followers,
                                                         'ed':ed,
                                                         'overview':overview,
                                                         'nws':nws})

        return render(request, 'show_profile.html', {'user_to_show':user, 'form':form})

    

#######################################################################
'''
def followers(request, username, template_name='followers_list.html'):
    """ List this user's followers """
    user = get_object_or_404(user_model, username=username)
    followers = Follow.objects.followers(user)

    return render(request, template_name, {
        get_friendship_context_object_name(): user,
        'friendship_context_object_name': get_friendship_context_object_name()
    })


def following(request, username, template_name='following_list.html'):
    """ List who this user follows """
    user = get_object_or_404(user_model, username=username)
    following = Follow.objects.following(user)
    nb_following = len(following)

    return render(request, template_name, {
        get_friendship_context_object_name(): user,
        'friendship_context_object_name': get_friendship_context_object_name(),
        'following':following,
        'nb_following':nb_following
    })


@login_required
def follower_add(request, followee_username, template_name='home.html'):
    """ Create a following relationship """
    ctx = {'followee_username': followee_username}

    if request.method == 'POST':
        followee = user_model.objects.get(username=followee_username)
        follower = request.user
        message = 'Ajouté avec succès !'
        uuid_id = followee.id
        try:
            Follow.objects.add_follower(follower, followee)
            notification_handler(
            follower, followee, Notification.FOLLOW,
            id_value=str(uuid_id), key='social_update')
            
        except AlreadyExistsError as e:
            ctx['errors'] = ["%s" % e]
        else:
            return HttpResponse(json.dumps({'message':message}))

    return render(request, template_name, ctx)
        
@login_required
def follower_remove(request, followee_username, template_name='friendship/follow/remove.html'):
    """ Remove a following relationship """
    if request.method == 'POST':
        message = 'Supprimé avec succès !'
        followee = user_model.objects.get(username=followee_username)
        follower = request.user
        Follow.objects.remove_follower(follower, followee)
        return HttpResponse(json.dumps({'message':message}))

    return render(request, template_name, {'followee_username': followee_username})
'''

def all_users(request, template_name="friendship/user_actions.html"):
    users = user_model.objects.all()

    return render(request, template_name, {get_friendship_context_object_list_name(): users})


def blocking(request, username, template_name='friendship/block/blockers_list.html'):
    """ List this user's followers """
    user = get_object_or_404(user_model, username=username)
    blockers = Block.objects.blocked(user)

    return render(request, template_name, {
        get_friendship_context_object_name(): user,
        'friendship_context_object_name': get_friendship_context_object_name()
    })


def blockers(request, username, template_name='friendship/block/blocking_list.html'):
    """ List who this user follows """
    user = get_object_or_404(user_model, username=username)
    blocking = Block.objects.blocking(user)

    return render(request, template_name, {
        get_friendship_context_object_name(): user,
        'friendship_context_object_name': get_friendship_context_object_name()
    })




def followers(request, username):
    user = user_model.objects.get(username=username)
    user_profile = get_user_profile(user=user)
    profiless = user_profile.followers.all
    nbs = user_profile.get_number_of_following()
    

    context = {
        'header': 'Followers',
        'profiless': profiless,
        'nbs' : nbs
    }

    return render(request, 'following.html', context)


def following(request, username):
    user_f = user_model.objects.get(username=username)
    user_profile = get_user_profile(user=user_f)
    r_user = request.user
    r_user_profile = get_user_profile(user=r_user)
    r_profiles = r_user_profile.following.all
    r_profiless = r_user_profile.followers.all
    profiles = user_profile.following.all()
    profiless = user_profile.followers.all()
    nb = user_profile.get_number_of_following()
    nbs = user_profile.get_number_of_followers()
    #commun = user_profile.followers.filter(User__in=r_profiless)
    print (profiles)

    context = {
        'user_f': user_f,
        'header': 'Following',
        'profiles': profiles,
        'nb' : nb,
        'profiless': profiless,
        'nbs' : nbs,
        #'commun' : commun
    }
    return render(request, 'following.html', context)

def user_infos(request, username):
    him_her = user_model.objects.get(username=username)
    user_profile = get_user_profile(user=him_her)
    exp = Experience.objects.filter(auteur=him_her)
    ed = Education.objects.filter(auteur=him_her)
    bio = Overview.objects.filter(auteur=him_her)
    sk = Skill.objects.filter(auteur=him_her)
    
    ctx = {
        'him_her': him_her,
        'exp': exp,
        'ed': ed,
        'bio': bio,
        'sk': sk,
        'user_profile': user_profile
    }
    return render(request, 'about.html', ctx)
    


@ajax_request
@login_required
def follow_toggle(request):
    user_profile = get_user_profile(user=request.user)
    follow_profile_pk = request.POST.get('follow_profile_pk')
    user = user_model.objects.get(username=follow_profile_pk)
    follow_profile = get_user_profile(user=user)
    follower = user_profile.user
    followee = follow_profile.user 
    uuid_id = followee.id
    print(uuid_id)
    print(follower)
    print(followee)

    try:
        if user_profile != follow_profile:
            if request.POST.get('type') == 'follow':
                user_profile.following.add(follow_profile.user)
                follow_profile.followers.add(user_profile.user)

                notification_handler(
                    follower, followee, 
                    Notification.FOLLOW, 
                    key='social_update'
                )

            elif request.POST.get('type') == 'unfollow':
                user_profile.following.remove(follow_profile.user)
                follow_profile.followers.remove(user_profile.user)
            user_profile.save()
           
            result = 1
        else:
            result = 0
    except Exception as e:
        print(e)
        result = 0

    return {
        'result': result,
        'type': request.POST.get('type'),
        'follow_profile_pk': follow_profile_pk
    }
