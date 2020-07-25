from importlib import import_module

from .settings import USER_SERIALIZER_CLASS



def import_class(class_string):
    module, classname = class_string.rsplit(".", 1)
    m = import_module(module)
    return getattr(m, classname)


def get_user_serializer_class():
    return import_class(USER_SERIALIZER_CLASS)
