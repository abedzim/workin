from django import forms
from django.contrib.auth.models import User, Group
from .models import Post

import django_filters


class UserFilter(django_filters.FilterSet):
    price = django_filters.NumberFilter(name='price')

    class Meta:
        model = Post
        fields = ['title', 'category', 'price', 'country', 'skills']
