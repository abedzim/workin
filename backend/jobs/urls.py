from django.conf.urls import url
from django.contrib import admin

from .views import (
	post_list,
	post_create,
	post_detail,
	post_update,
	post_delete,
	JobCreateView,
        Jobfilt,
        search
	)

app_name="jobs"
urlpatterns = [
	url(r'^$', post_list, name='list'),
    url(r'^create/$', post_create, name='create'),
    url(r'^all/$', Jobfilt.as_view(), name="all"),
    url(r'^search/$', search, name='search'),
    url(r'^(?P<slug>[\w-]+)/$', post_detail, name='detail'),
    url(r'^(?P<slug>[\w-]+)/edit/$', post_update, name='update'),
    url(r'^(?P<slug>[\w-]+)/delete/$', post_delete, name='delete'),
    url(r'^jobcreate/$', JobCreateView.as_view(), name="jobcreate"),
    
    
    #url(r'^posts/$', "<appname>.views.<function_name>"),
]
