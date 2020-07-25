from django.conf.urls import url
from . import views

app_name = 'posts'

urlpatterns = [

    url(r'^post/(?P<id>\d+)/$', views.see_post, name='see_post'),
    url(r'^post/(?P<id>\d+)/edit/$', views.edit_post, name='edit_post'),
    url(r'^post/(?P<id>\d+)/delete/$', views.delete_post, name='delete_post'),
    url(r'^post/new/$', views.create_post, name='create_post'),

]