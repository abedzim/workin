import datetime
from django.utils import translation
from django.core.exceptions import ObjectDoesNotExist
from django.conf import settings

from userena import settings as userena_settings
from userena.compat import SiteProfileNotAvailable
from userena.utils import get_user_profile
from django_countries.fields import Country
from .utils import get_client_ip, get_country_by_ip
from django.core.cache import cache


def langmiddleware(get_response):

    def middleware(request):
        lang_cookie = request.session.get(settings.LANGUAGE_COOKIE_NAME)
        if not lang_cookie:
            if request.user.is_authenticated:
                try:
                    profile = get_user_profile(user=request.user)
                except (ObjectDoesNotExist, SiteProfileNotAvailable):
                    profile = False

                if profile:
                    try:
                        lang = getattr(profile, userena_settings.USERENA_LANGUAGE_FIELD)
                        translation.activate(lang)
                        request.LANGUAGE_CODE = translation.get_language()
                    except AttributeError: pass
        return get_response(request)
    return middleware

def onlinecheck(get_response):

    def middleware(request):
        current_user = request.user
        if request.user.is_authenticated:
            now = datetime.datetime.now()
            cache.set('seen_%s' % (current_user.username), now, 
                           settings.USER_LASTSEEN_TIMEOUT)
        return get_response(request)
    return middleware

def country(get_response):
    """Detect the user's country and assign it to `request.country`."""

    def middleware(request):
        client_ip = get_client_ip(request)
        if client_ip:
            request.country = get_country_by_ip(client_ip)
        if not request.country:
            request.country = Country(settings.DEFAULT_COUNTRY)
        return get_response(request)

    return middleware
