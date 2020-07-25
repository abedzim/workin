from __future__ import unicode_literals

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils import timezone
from django.utils.safestring import mark_safe
from django.utils.text import slugify
from taggit.managers import TaggableManager
from django_countries.fields import CountryField
from martor.models import MartorField
from manager import TrackerManager
#from django.contrib.gis.geos import Point
from places.fields import PlacesField

from markdown import markdown

from .utils import get_read_time
# Create your models here.
# MVC MODEL VIEW CONTROLLER


#Post.objects.all()
#Post.objects.create(user=user, title="Some time")

class PostManager(models.Manager):
    def active(self, *args, **kwargs):
        # Post.objects.all() = super(PostManager, self).all()
        return super(PostManager, self).filter(publish__lte=timezone.now())
    
    def get_counted_tags(self):
        tag_dict = {}
        query = self.filter(status='P').annotate(
            tagged=Count('tags')).filter(tags__gt=0)
        for obj in query:
            for tag in obj.tags.names():
                if tag not in tag_dict:
                    tag_dict[tag] = 1

                else:  # pragma: no cover
                    tag_dict[tag] += 1

        return tag_dict.items()


class Post(models.Model):
    JOBS_CHOICES = (
        (1, ('Full-time')),
        (2, ('Half-time')),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey('CATEGORY',on_delete=models.CASCADE, null=True)
    job_type = models.IntegerField(('job_type'),choices=JOBS_CHOICES, blank=True, null=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    content = MartorField()
    draft = models.BooleanField(default=False)
    location = PlacesField(blank=True)
    skills = TaggableManager()
    featured = models.BooleanField(default=False)
    read_time =  models.IntegerField(default=0) # models.TimeField(null=True, blank=True) #assume minutes
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    ip_country = CountryField(max_length=255, blank=True)
    ip_region = models.CharField(max_length=255, blank=True)
    ip_city = models.CharField(max_length=255, blank=True)
    ip_code = models.CharField(max_length=255, blank=True)
    device = models.CharField(max_length=30, blank=True)
    updated = models.DateTimeField(auto_now=True, auto_now_add=False)
    timestamp = models.DateTimeField(auto_now=False)

    objects = PostManager()

    def __unicode__(self):
        return self.title

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("jobs:detail", kwargs={"slug": self.slug})

    class Meta:
        ordering = ["-timestamp", "-updated"]

    def get_markdown(self):
        content = self.content
        markdown_text = markdown(content)
        return mark_safe(markdown_text)

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type
    
class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):                           # __str__ method elaborated later in
        return self.name


def create_slug(instance, new_slug=None):
    slug = slugify(instance.title)
    if new_slug is not None:
        slug = new_slug
    qs = Post.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" %(slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)

    if instance.content:
        html_string = instance.get_markdown()
        read_time_var = get_read_time(html_string)
        instance.read_time = read_time_var


pre_save.connect(pre_save_post_receiver, sender=Post)










