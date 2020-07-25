import re
from django import template
from django.urls import reverse, NoReverseMatch
from likes.models import Like

register = template.Library()

@register.simple_tag
def has_user_liked_post(post, user):
    try:
        like = Like.objects.get(post=post, user=user)
        return "fa-heart"
    except:
        return "fa-heart-o"


@register.simple_tag
def is_following(users_profile, profile_to_check):
    return users_profile.following.filter(username=profile_to_check.user.username).exists()


@register.simple_tag
def find_proper_user(user, room):
    if room.receiver == user:
        return room.sender
    else:
        return room.receiver


@register.filter(name='addClass')
def addClass(field, css):
   return field.as_widget(attrs={"class":css})


@register.filter(name='addID')
def addID(field, css):
   return field.as_widget(attrs={"id":css})


@register.filter(name='parse_hashtags')
def parse_hashtags(field):
    hashtags_arr = re.findall(r"#(\w+)", field)
    for hashtag in hashtags_arr:
        html_tag = "<a href='/explore?hashtag=" + hashtag + "'>#" + hashtag + "</a>"
        field = field.replace("#" + hashtag, html_tag)
    return field


@register.simple_tag(takes_context=True)
def active(context, pattern_or_urlname):
    try:
        pattern = '^' + reverse(pattern_or_urlname)
    except NoReverseMatch:
        pattern = pattern_or_urlname
    path = context['request'].path
    if re.search(pattern, path):
        return 'active'
    return ''

@register.filter
def cool_number(value, num_decimals=2):
    """
    Django template filter to convert regular numbers to a
    cool format (ie: 2K, 434.4K, 33M...)
    :param value: number
    :param num_decimals: Number of decimal digits
    """

    int_value = int(value)
    formatted_number = '{{:.{}f}}'.format(num_decimals)
    if int_value < 1000:
        return str(int_value)
    elif int_value < 1000000:
        return formatted_number.format(int_value/1000.0).rstrip('0.') + 'K'
    else:
        return formatted_number.format(int_value/1000000.0).rstrip('0.') + 'M'
