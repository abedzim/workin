from django import forms
from django.contrib.auth.models import User, Group
from .models import Post, Category
from django.forms.widgets import TextInput
from django.utils.translation import ugettext as _ 
from django.forms.widgets import SelectMultiple,MultipleHiddenInput,MultiWidget
from django_countries.fields import CountryField
from django_countries import countries

import django_filters


class GEOSGeometryFilter(django_filters.CharFilter):

    def filter(self, qs, value):
        try:
            from django.contrib.gis.geos import GEOSGeometry
            value = GEOSGeometry(value)
            return super().filter(qs, value)
        except (ValueError, TypeError, ImportError):
            return qs

class JobFilter(django_filters.FilterSet):
    CHOICES = (
        ('ascending', 'Ascending'),
        ('descending', 'Descending'),
    )

    JOBS_CHOICES = (
        (1, ('Full-time')),
        (2, ('Half-time')),
    )
    title = django_filters.CharFilter(lookup_expr='icontains')
    distance = django_filters.NumberFilter(label='distance', method='filter_by_distance')
    ordering = django_filters.ChoiceFilter(label='Ordering', empty_label='Ordering', choices=CHOICES, method='filter_by_order')
    price__gt = django_filters.NumberFilter(field_name='price', lookup_expr='gte', label=None)
    price__lt = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    job_type = django_filters.ChoiceFilter(field_name='job_type', label='Job Type', choices=JOBS_CHOICES, empty_label="Job Type")
    #skills = django_filters.ModelChoiceFilter(
        #field_name='skills', lookup_expr='icontains', 
        #widget=SelectMultiple(attrs={'placeholder': 'Skills'}),
        #queryset=Post.skills.all()
    #)

    category = django_filters.ModelChoiceFilter(
        field_name='category',
        empty_label='Uncategorized',
        queryset=Category.objects.all(),
    )

    class Meta:
        model = Post
        fields = ['title', 'price__gt', 'price__lt', 'job_type',]

    def filter_by_order(self, queryset, name, value):
        expression = 'timestamp' if value == 'ascending' else '-timestamp'
        return queryset.order_by(expression)

    def filter_by_distance(self, queryset, value):
        try:
            from django.contrib.gis.db.models import PointField
            filter_overrides_value[PointField] = {
                'filter_class': GEOSGeometryFilter
            }
        except:
            pass


