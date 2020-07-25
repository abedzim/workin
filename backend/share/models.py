from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from userena import settings as userena_settings
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.utils.translation import pgettext, pgettext_lazy 
from easy_thumbnails.fields import ThumbnailerImageField

from asgiref.sync import async_to_sync

from channels.layers import get_channel_layer

from notifications.models import Notification, notification_handler


class CommentManager(models.Manager):
    def all(self):
        qs = super(CommentManager, self).filter(parent=None)
        return qs

    def filter_by_instance(self, instance):
        content_type = ContentType.objects.get_for_model(instance.__class__)
        obj_id = instance.id
        qs = super(CommentManager, self).filter(content_type=content_type, object_id= obj_id).filter(parent=None)
        return qs

class Comment(models.Model):
    user        = models.ForeignKey(settings.AUTH_USER_MODEL, default=1,on_delete=models.CASCADE)
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    parent      = models.ForeignKey("self", null=True, blank=True, on_delete=models.CASCADE)

    content     = models.TextField()
    timestamp   = models.DateTimeField(auto_now_add=True)

    objects = CommentManager()

    class Meta:
        ordering = ['-timestamp']


    def __unicode__(self):  
        return str(self.user.username)

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
        return reverse("comments:thread", kwargs={"id": self.id})

    def get_delete_url(self):
        return reverse("comments:delete", kwargs={"id": self.id})
        
    def children(self): #replies
        return Comment.objects.filter(parent=self)

    @property
    def is_parent(self):
        if self.parent is not None:
            return False
        return True
################################################################################################################################################
def upload_to_post_image(instance, filename):
    """
    Uploads a mugshot for a user to the ``USERENA_MUGSHOT_PATH`` and saving it
    under unique hash for the image. This is for privacy reasons so others
    can't just browse through the mugshot directory.

    """
    extension = filename.split('.')[-1].lower()
    salt, hash = generate_sha1(instance.pk)
    path = userena_settings.USERENA_COVER_PATH % {'username': instance.user.username,
                                                    'id': instance.user.id,
                                                    'date': instance.user.date_joined,
                                                    'date_now': get_datetime_now().date()}
    return '%(path)s%(hash)s.%(extension)s' % {'path': path,
                                               'hash': hash[:10],
                                               'extension': extension}


class Share(models.Model):
    """News model to contain small information snippets in the same manner as
    Twitter does."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, related_name="sharer", on_delete=models.SET_NULL)
    parent = models.ForeignKey("self", blank=True,null=True, on_delete=models.CASCADE, related_name="thread")
    timestamp = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=280)
    image = models.ImageField(
        _('post image'),blank=True,null=True, upload_to='post_image_pictures/%Y/%m/%d/')
    #post_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    liked = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="liked_news")
    reply = models.BooleanField(verbose_name=_("Is a reply?"), default=False)
    enable_comment = models.BooleanField(default=False)
    public_post = models.BooleanField(default=False)

    class Meta:
        verbose_name = _("News")
        verbose_name_plural = _("News")
        ordering = ("-timestamp",)

    def __str__(self):
        return str(self.content)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if not self.reply:
            channel_layer = get_channel_layer()
            payload = {
                    "type": "receive",
                    "key": "additional_news",
                    "actor_name": self.user.username

                }
            async_to_sync(channel_layer.group_send)('notifications', payload)

    def get_absolute_url(self):
        return reverse("news:detail", kwargs={"id": self.id})

    @property
    def comments(self):
        instance = self
        qs = Comment.objects.filter_by_instance(instance)
        return qs

    def switch_like(self, user):
        if user in self.liked.all():
            self.liked.remove(user)

        else:
            self.liked.add(user)
            notification_handler(user, self.user,
                                 Notification.LIKED, action_object=self,
                                 id_value=str(self.id),
                                 key='social_update')

    def get_parent(self):
        if self.parent:
            return self.parent

        else:
            return self

    def reply_this(self, user, text):
        """Handler function to create a News instance as a reply to any
        published news.

        :requires:

        :param user: The logged in user who is doing the reply.
        :param content: String with the reply.
        """
        parent = self.get_parent()
        reply_news = Share.objects.create(
            user=user,
            content=text,
            reply=True,
            parent=parent
        )
        notification_handler(
            user, parent.user, Notification.REPLY, action_object=reply_news,
            id_value=str(parent.id), key='social_update')

    def get_thread(self):
        parent = self.get_parent()
        return parent.thread.all()

    def count_thread(self):
        return self.get_thread().count()

    def count_likers(self):
        return self.liked.count()

    def get_likers(self):
        return self.liked.all()



