try:
    import urlparse
except ImportError:
    import urllib.parse as urlparse

from django.conf import settings
from django.core.cache import cache
from django.urls import reverse
import feedparser


def load_feeds():
    """Load feeds and entries.
    """
    results = {}
    for key, source, prefix in settings.FEED_SOURCES:
        parsed = feedparser.parse(source)
        for entry in parsed['entries']:
            # Determine the path that we would use on our site.
            link = entry['link']
            if link.startswith(prefix):
                # Take the rest of the link as path
                link = link[len(prefix):]
            # Get the path without the domain name at the beginning
            # and without any queries or fragments at the end.  This
            # also works for a link where we have stripped the prefix
            # already.
            path = urlparse.urlparse(link).path
            path = path.lstrip('/')
            entry['path'] = path
            entry['local_link'] = reverse('externalfeed-entry',
                                          args=['%s/%s' % (key, path)])
        results[key] = parsed
    return results


def feeds():
    """Get feeds and entries.

    Possibly we get this from the cache.
    """
    if not settings.FEED_SOURCES:
        return {}
    arguments = None
    cache_key = 'feeds'  # possibly add arguments
    timeout = 60*10  # 10 minutes
    result = grab(cache_key, load_feeds, arguments, timeout)
    return result


def feeditem(key, path):
    # Get the key from our feeds and see if an entry can be found with
    # the given path.
    feed = feeds().get(key)
    if feed is None:
        return
    for entry in feed.entries:
        if entry['path'] == path:
            return entry


def grab(key, loader, arguments=None, timeout=None):
    # Grab the vlue of a key from the django cache.  If there is no
    # such key, add it with as value the result of calling the
    # 'loader' function, possibly with arguments and return the value.
    val = cache.get(key)
    if val is None:
        if arguments is None:
            val = loader()
        else:
            val = loader(*arguments)
        cache.set(key, val, timeout)
    return val
