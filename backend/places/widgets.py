# -*- coding: utf-8 -*-

from django.forms import widgets
from django.utils import six
from django.template.loader import render_to_string
from django.utils.translation import ugettext_lazy as _

from .conf import settings


class PlacesWidget(widgets.MultiWidget):
    template_name = 'places/widgets/places.html'

    def __init__(self, attrs=None):
        _widgets = (
            widgets.TextInput(
                attrs={'data-geo': 'formatted_address', 'data-id': 'map_place','placeholder': _('Location'),}
            ),

            widgets.TextInput(
                attrs={
                    'data-geo': 'lat',
                    'data-id': 'map_latitude',
                    'placeholder': _('Latitude'),
                }
            ),
            widgets.TextInput(
                attrs={
                    'data-geo': 'lng',
                    'data-id': 'map_longitude',
                    'placeholder': _('Longitude'),
                }
            ),
        )
        super(PlacesWidget, self).__init__(_widgets, attrs)

    def decompress(self, value):
        if isinstance(value, six.text_type):
            return value.rsplit(',')
        if value:
            return [value.place, value.latitude, value.longitude]
        return [None, None]

    def get_context(self, name, value, attrs):
        context = super(PlacesWidget, self).get_context(name, value, attrs)
        context['map_widget_height'] = settings.MAP_WIDGET_HEIGHT
        context['map_options'] = settings.MAP_OPTIONS
        context['marker_options'] = settings.MARKER_OPTIONS

        return context

    class Media:
        js = (
            '//maps.googleapis.com/maps/api/js?key={}&libraries=places'.format(
                settings.MAPS_API_KEY
            ),
            'places/places.js',
        )
        css = {'all': ('places/places.css',)}
