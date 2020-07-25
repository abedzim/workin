from django import template
from django.urls import reverse

register = template.Library()


@register.filter
def model_verbose_name(model):
    """
    Sample usage:
        {{model|model_name}}
    """
    return model._meta.verbose_name


@register.filter
def model_verbose_name_plural(model):
    """
    Sample usage:
        {{model|model_name}}
    """
    return model._meta.verbose_name_plural


@register.filter
def model_name(model):
    """
    Sample usage:
        {{model|model_name}}
    """
    return model._meta.model_name


@register.filter
def app_label(model):
    """
    Sample usage:
        {{model|app_label}}
    """
    return model._meta.app_label


@register.filter
def change_object_url(object):
    """
    Given an object, returns the "canonical" url for object editing:

        <a href="{{object|change_object_url}}">change this object</a>
    """
    model = object.__class__
    return reverse('frontend:object-change', args=(model._meta.app_label, model._meta.model_name, object.id))


@register.filter
def change_model_url(model, object_id):
    """
    Given a model and an object id, returns the "canonical" url for object editing:

        <a href="{{model|change_model_url:object.id}}">change this object</a>
    """
    return reverse('frontend:object-change', args=(model._meta.app_label, model._meta.model_name, object_id))


@register.filter
def add_model_url(model):
    """
    Given a model, return the "canonical" url for adding a new object:

        <a href="{{model|add_model_url}}">add a new object</a>
    """
    return reverse('frontend:object-add', args=(model._meta.app_label, model._meta.model_name))


@register.filter
def delete_object_url(object):
    """
    Given an object, returns the "canonical" url for object deletion:

        <a href="{{object|delete_object_url}}">delete this object</a>
    """
    model = object.__class__
    return reverse('frontend:object-delete', args=(model._meta.app_label, model._meta.model_name, object.id))


@register.filter
def delete_model_url(model, object_id):
    """
    Given a model and an object id, returns the "canonical" url for object deletion:

        <a href="{{model|delete_model_url:object.id}}">delete this object</a>
    """
    return reverse('frontend:object-delete', args=(model._meta.app_label, model._meta.model_name, object_id))


@register.filter
def clone_object_url(object):
    """
    Given an object, returns the "canonical" url for object cloning:

        <a href="{{object|clone_object_url}}">clone this object</a>
    """
    model = object.__class__
    return reverse('frontend:object-clone', args=(model._meta.app_label, model._meta.model_name, object.id))


@register.filter
def clone_model_url(model, object_id):
    """
    Given a model and an object id, returns the "canonical" url for object cloning:

        <a href="{{model|clone_model_url:object.id}}">clone this object</a>
    """
    return reverse('frontend:object-clone', args=(model._meta.app_label, model._meta.model_name, object_id))


@register.simple_tag(takes_context=True)
def testhasperm(context, model, action):
    """
    Returns True iif the user have the specified permission over the model.
    For 'model', we accept either a Model class, or a string formatted as "app_label.model_name".

    Sample usage:

        {% testhasperm model 'view' as can_view_objects %}
        {% if not can_view_objects %}
            <h2>Sorry, you have no permission to view these objects</h2>
        {% endif %}
    """
    user = context['request'].user
    if isinstance(model, str):
        app_label, model_name = model.split('.')
    else:
        app_label = model._meta.app_label
        model_name = model._meta.model_name
    required_permission = '%s.%s_%s' % (app_label, action, model_name)
    return user.is_authenticated and user.has_perm(required_permission)

@register.simple_tag
def relative_url(value, field_name, urlencode=None):
    url = '?{}={}'.format(field_name, value)
    if urlencode:
        querystring = urlencode.split('&')
        filtered_querystring = filter(lambda p: p.split('=')[0] != field_name, querystring)
        encoded_querystring = '&'.join(filtered_querystring)
        url = '{}&{}'.format(url, encoded_querystring)
    return url


@register.tag
def ifhasperm(parser, token):
    """
    Check user permission over specified model.
    (You can specify either a model or an object).

    Sample usage:

        {% ifhasperm model 'add' %}
            <div style="color: #090">User can add objects</div>
        {% else %}
            <div style="color: #900">User cannot add objects</div>
        {% endifhasperm %}
    """

    # Separating the tag name from the parameters
    try:
        tag, model, action = token.contents.split()
    except (ValueError, TypeError):
        raise template.TemplateSyntaxError(
            "'%s' tag takes three parameters" % tag)

    default_states = ['ifhasperm', 'else']
    end_tag = 'endifhasperm'

    # Place to store the states and their values
    states = {}

    # Let's iterate over our context and find our tokens
    while token.contents != end_tag:
        current = token.contents
        states[current.split()[0]] = parser.parse(default_states + [end_tag])
        token = parser.next_token()

    model_var = parser.compile_filter(model)
    action_var = parser.compile_filter(action)
    return CheckPermNode(states, model_var, action_var)


class CheckPermNode(template.Node):
    def __init__(self, states, model_var, action_var):
        self.states = states
        self.model_var = model_var
        self.action_var = action_var

    def render(self, context):

        # Resolving variables passed by the user
        model = self.model_var.resolve(context)
        action = self.action_var.resolve(context)

        # Check user permission
        if testhasperm(context, model, action):
            html = self.states['ifhasperm'].render(context)
        else:
            html = self.states['else'].render(context) if 'else' in self.states else ''

        return html
