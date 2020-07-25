from django.conf.urls import url
from . import views

app_name = 'likes'

urlpatterns = [

    url(r'^post/(?P<pk>\d+)/likes/$', views.likes, name='likes'),
    url(r'^like/$', views.add_like, name='like'),

]