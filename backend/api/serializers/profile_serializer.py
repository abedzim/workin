import random
try:
    from hashlib import sha1 as sha_constructor
except ImportError:
    from django.utils.hashcompat import sha_constructor

from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import authenticate, get_user_model
from django.conf import settings
from django.forms import widgets
from userena.utils import signin_redirect, get_profile_model, get_user_profile

from userena import settings as userena_settings
from profiles.models import Profile
from users_infos.models import  Education, Experience, Skill
from about_me.models import Overview, Skills

from rest_framework import serializers
from rest_framework.reverse import reverse
from rest_framework.validators import UniqueValidator

from .settings import USERNAME_RE, PASSWORD_MIN_LENGTH

from rest_framework.authtoken.models import Token
from django_countries.serializer_fields import CountryField
from django_countries import Countries
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)