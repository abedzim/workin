from django.conf.urls import url

from news import views

app_name = 'news'
urlpatterns = [
    url(r'^$', views.NewsListView.as_view(), name='list'),
    #url(r'^update/(?P<pk>[-\w]+)/$',views.NewsUpdateView.as_view(), name='update_news'),
    url(r'^delete/(?P<pk>[-\w]+)/$',
        views.NewsDeleteView.as_view(), name='delete_news'),
    url(r'^post-news/$', views.post_news, name='post_news'),
    url(r'^like/$', views.like, name='like_post'),
    url(r'^get-thread/$', views.get_thread, name='get_thread'),
    url(r'^post-comment/$', views.post_comment, name='post_comments'),
    url(r'^update-interactions/$', views.update_interactions, name='update_interactions'),
]
