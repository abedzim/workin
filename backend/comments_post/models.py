from django.db import models
from django.contrib.auth.models import User
from posts.models import PPost
from django.conf import settings


class PComment(models.Model):
    post = models.ForeignKey(PPost, related_name="commented_post", on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    comment = models.CharField(max_length=100)
    time_created = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
        return self.comment
