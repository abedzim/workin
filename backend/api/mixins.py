from django.http import HttpResponsePermanentRedirect

from userena import settings as userena_settings


class SecureRequiredMixin(object):
    """
    Mixin to switch an url from http to https.

    If a view is accessed through http and this mixin is applied to that
    view, than it will return a permanent redirect to the secure (https)
    version of the same view.

    The mixin also checks wheter ``USE_HTTPS`` is enabled. If
    disabled, it does not redirect to https because the project doesn't
    support it.
    """
    def dispatch(self, request, *args, **kwargs):
        if not request.is_secure():
            if userena_settings.DEFAULT_USERENA_USE_HTTPS:
                request_url = request.build_absolute_uri(request.get_full_path())
                secure_url = request_url.replace('http://', 'https://')
                return HttpResponsePermanentRedirect(secure_url)
        return super(SecureRequiredMixin, self).dispatch(request, *args, **kwargs)
