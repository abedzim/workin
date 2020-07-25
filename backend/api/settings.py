from django.conf import settings


USERNAME_RE = getattr(settings, 'USERENA_RF_USERNAME_RE', r'^[\.\w]+$')
PASSWORD_MIN_LENGTH = getattr(settings, 'USERENA_RF_PASSWORD_MIN_LENGTH', 6)
USER_SERIALIZER_CLASS = getattr(
    settings,
    'USERENA_RF_USER_SERIALIZER_CLASS',
    'api.serializers.UserSerializer',
    )
API_MESSAGE_KEY = getattr(settings, 'USERENA_RF_API_MESSAGE_KEY', 'message')
