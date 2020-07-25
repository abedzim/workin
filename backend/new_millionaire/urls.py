from django.conf.urls import url
from django.urls import path, include
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from new_millionaire import views
from new_millionaire.views import show_profile
from search.views import get_suggestions
from django.contrib.auth import views as auth_views
from boards import views as Bviews
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog, set_language
from django.contrib.sitemaps.views import sitemap
from django.views.generic import TemplateView
import fluent_comments.urls
from jet.dashboard.dashboard_modules import google_analytics_views
from rest_framework.authtoken.views import obtain_auth_token
from django_filters.views import FilterView

from django.views.decorators.csrf import csrf_exempt

from jobs.filters import JobFilter

admin.autodiscover()

notransurlpatterns = [
    url('^$', views.welcome, name='welcome'),
    path('i18n/', set_language, name="set_language"),
    #url('news/', include('news.urls', namespace='news')),
    path('likes/',include('likes.urls', namespace='likes')),
    path('posts/', include('posts.urls', namespace="posts")),
    path('direct-chat/', include('django_chatter.urls', namespace='direct-chat')), 
    path('follow_toggle/', views.follow_toggle, name='follow_toggle'),
    path('notifications/', include('notifications.urls', namespace='notifications')),
    #url(r'^admin/', include('client_admin.urls')),
    url(r'^jet/', include('jet.urls', 'jet')),
    url(r'^jet/dashboard/', include('jet.dashboard.urls', 'jet-dashboard')), 
    path('admin/', admin.site.urls),
    path('search/', include('search.urls', namespace='search')),
    path('jobfilter/', TemplateView.as_view(template_name='homejob.html'), name='jobfilter'),
    path('jsearch/', FilterView.as_view(filterset_class=JobFilter, template_name='search/user_list.html'), name='jsearch'),
    path('martor/', include('martor.urls')),
    url(r'^comments/', include(fluent_comments.urls)),
    url(r'^(?P<username>\w+)/followers/$', views.followers, name='followers'),
    url(r'^(?P<username>\w+)/following/$', views.following, name='following'),
    url(r'^(?P<username>\w+)/infos/$', views.user_infos, name='user_infos'),
    path('share/', include('share.urls', namespace='share')),
    url(r'^accounts/', include('userena.urls')),
    path('users-infos/', include('users_infos.urls', namespace='users-infos')),
    #url('social', include('social.apps.django_app.urls', namespace='social')),
    #url(r'^tracking/', include('tracking.urls', namespace='tracking')),
    url(r'^externalnews/', include('externalfeed.urls')),
    url(r'^api/', include('api.urls')),
    path('auth/', obtain_auth_token),
    
]
    

transurlpatterns = [
    url(r'^home/', views.home, name='home'),
    url(r'^about/', views.about, name='about'),
    url(r'terms&conditions/', views.terms, name='terms'),
    url(r'^talking$', Bviews.BoardListView.as_view(), name='homes'),
    url(r'^jobs/', include('jobs.urls', namespace='jobs')),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r"^jsi18n/$", JavaScriptCatalog.as_view(), name="javascript-catalog"),
################################################################################
#################################|Recherches|###################################
################################################################################
    
    # url(r'^users/',FacetedSearchView.as_view(), name='person'),
    url('^show_profile', show_profile, name='show_profile'),
    url(r'^usersearch/autocomplete/$', get_suggestions),

################################################################################
##################################|Messages|####################################
################################################################################
    

###############################################################################
###################################|Boards|####################################
###############################################################################
    
    url(r'^blog/', include('articles.urls', namespace='blog')),
    url(r'^qa/', include('qa.urls', namespace='qa')),


    url(r'^boards/(?P<pk>\d+)/$', Bviews.TopicListView.as_view(), name='board_topics'),
    url(r'^boards/(?P<pk>\d+)/new/$', Bviews.new_topic, name='new_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/$', Bviews.PostListView.as_view(), name='topic_posts'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/reply/$', Bviews.reply_topic, name='reply_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/posts/(?P<post_pk>\d+)/edit/$',
        Bviews.PostUpdateView.as_view(), name='edit_post'),
    
################################################################################
#################################|ABONNEMENTS|##################################
################################################################################
   
    
]

urlpatterns = notransurlpatterns + i18n_patterns(*transurlpatterns)

if 'rosetta' in settings.INSTALLED_APPS:
    urlpatterns += [
        url(r'^rosetta/', include('rosetta.urls'))
    ]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    
    
################################################################################
##############################|Authentification|################################
################################################################################
"""
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^login/$', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    url(r'^logout/$', auth_views.LogoutView.as_view(), name='logout'),
    url(r'^reset/$',
    auth_views.PasswordResetView.as_view(
        template_name='password_reset.html',
        email_template_name='password_reset_email.html',
        subject_template_name='password_reset_subject.txt',
    ),
    name='password_reset'),
    url(r'^reset/done/$',
        auth_views.PasswordResetDoneView.as_view(template_name='password_reset_done.html'),
        name='password_reset_done'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        auth_views.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
        name='password_reset_confirm'),
    url(r'^reset/complete/$',

        auth_views.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),
        name='password_reset_complete'),
    url(r'^settings/password/$', auth_views.PasswordChangeView.as_view(template_name='password_change.html'),
        name='password_change'),
    url(r'^settings/password/done/$', auth_views.PasswordChangeDoneView.as_view(template_name='password_change_done.html'),
        name='password_change_done'),
"""
    
