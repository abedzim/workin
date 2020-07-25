from django.conf.urls import url
from django.urls import path
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

#from bootcamp.messager.consumers import MessagerConsumer
from notifications.consumers import NotificationsConsumer
from django_chatter.consumers import ChatConsumer, AlertConsumer
import notifications.routing
# from bootcamp.notifications.routing import notifications_urlpatterns
# from bootcamp.messager.routing import messager_urlpatterns

application = ProtocolTypeRouter({
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                url(r'^notifications/$', NotificationsConsumer),
                #url(r'^(?P<username>[^/]+)/$', MessagerConsumer),
                path('ws/django_chatter/chatrooms/<str:room_uuid>/', ChatConsumer),
                path('ws/django_chatter/users/<str:username>/', AlertConsumer),
            ]),
            
        ),
        
    ),
    
})
