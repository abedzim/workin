from django.conf.urls import url
from django.urls import path, include
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static
from new_millionaire import views
from new_millionaire.views import show_profile
from search.views import get_suggestions
from jobsearch.views import autocomplete
from django.contrib.auth import views as auth_views
from boards import views as Bviews
from cv import views as Cvviews
from django.conf.urls.i18n import i18n_patterns
from django.views.i18n import JavaScriptCatalog, set_language
from django.contrib.sitemaps.views import sitemap

notransurlpatterns = [
    path('i18n/', set_language, name="set_language"),
    url('news/', include('news.urls', namespace='news')),
    path('likes/',include('likes.urls', namespace='likes')),
    path('posts/', include('posts.urls', namespace="posts")),
    path('direct-chat/', include('django_chatter.urls')), 
    path('follow_toggle/', views.follow_toggle, name='follow_toggle'),
    path('notifications/', include('notifications.urls', namespace='notifications')),
    path('admin/', admin.site.urls),
]
    

transurlpatterns = [
    url('^$', views.welcome, name='welcome'),
    url(r'^talking$', Bviews.BoardListView.as_view(), name='home'),
    url(r'^accounts/', include('userena.urls')),
    url(r'^i18n/', include('django.conf.urls.i18n')),
    url(r"^jsi18n/$", JavaScriptCatalog.as_view(), name="javascript-catalog"),
################################################################################
#################################|Recherches|###################################
################################################################################
    url(r'^search/', include('search.urls', namespace='search')),
    url(r'^search/autocomplete/$', autocomplete),
    # url(r'^users/',FacetedSearchView.as_view(), name='person'),
    url('^show_profile', show_profile, name='show_profile'),
    url(r'^usersearch/autocomplete/$', get_suggestions),

################################################################################
##################################|Messages|####################################
################################################################################
    

###############################################################################
###################################|Boards|####################################
###############################################################################

    
    url(r'^messages/',
        include('messager.urls', namespace='messager')),
    url(r'^jobs/', include('jobs.urls', namespace='jobs')),
    url(r'^cv/', include('cv.urls', namespace='cv')),
    url(r'^jobsearch/', include('jobsearch.urls', namespace='jobsearch')),
    url(r'^blog/', include('articles.urls', namespace='blog')),


    url(r'^boards/(?P<pk>\d+)/$', Bviews.TopicListView.as_view(), name='board_topics'),
    url(r'^boards/(?P<pk>\d+)/new/$', Bviews.new_topic, name='new_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/$', Bviews.PostListView.as_view(), name='topic_posts'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/reply/$', Bviews.reply_topic, name='reply_topic'),
    url(r'^boards/(?P<pk>\d+)/topics/(?P<topic_pk>\d+)/posts/(?P<post_pk>\d+)/edit/$',
        Bviews.PostUpdateView.as_view(), name='edit_post'),
    
################################################################################
#################################|ABONNEMENTS|##################################
################################################################################
    
    url(r'^(?P<username>\w+)/followers/$', views.followers, name='followers'),
    url(r'^(?P<username>\w+)/following/$', views.following, name='following'),
    
]

urlpatterns = notransurlpatterns + i18n_patterns(*transurlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    import debug_toolbar
    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
    
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
    
