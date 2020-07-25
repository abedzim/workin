from django import template

from externalfeed import utils

register = template.Library()


@register.simple_tag(takes_context=True)
def feeds(context, format_string='', limit=0):
    t = template.loader.get_template('externalfeed/feeds_snippet.html')
    return t.render(template.Context(
        {'feeds': utils.feeds(),
         'format_string': format_string,
         'limit': limit}))


@register.simple_tag(takes_context=True)
def single_feed(context, key, format_string='', limit=0):
    # Parse the format string.  We are very tolerant.
    if 'full' in format_string:
        full = True
    else:
        full = False
    if 'list' in format_string:
        as_list = True
    else:
        as_list = False
    feeds = utils.feeds()
    feed = feeds.get(key)
    if feed is None:
        entries = []
    elif limit > 0:
        entries = feed.entries[:limit]
    else:
        entries = feed.entries
    t = template.loader.get_template('externalfeed/single_feed_snippet.html')
    return t.render(template.Context(
        {'feed': feed,
         'entries': entries,
         'full': full,
         'as_list': as_list}))


@register.simple_tag(takes_context=True)
def feed_entry(context, key, path):
    entry = utils.feeditem(key, path)
    t = template.loader.get_template('externalfeed/entry_snippet.html')
    return t.render(template.Context({'entry': entry}))


@register.simple_tag(takes_context=True)
def feed_entry_title(context, key, path):
    entry = utils.feeditem(key, path)
    if entry is not None:
        return entry.title
    return ""
