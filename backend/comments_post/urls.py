from django.conf.urls import url
from . import views

app_name = 'comments_p'

urlpatterns = [

    url(r'^comment/$', views.add_comment, name='comment'),

]
