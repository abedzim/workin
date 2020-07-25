from django.db import models
from django.conf import settings
from posts.models import PPost
from django.contrib.auth.models import User


class Like(models.Model):
    post = models.ForeignKey(PPost,on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("post", "user")
