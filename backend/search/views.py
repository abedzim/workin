from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Q
from django.http import JsonResponse
from django.views.generic import ListView

#from news.models import News
from helpers import ajax_required
#from friendships.models import Friend, Follow, FriendshipRequest, Block


class SearchListView(LoginRequiredMixin, ListView):
    """CBV to contain all the search results"""
    model = get_user_model()
    template_name = "profils.html"

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        query = self.request.GET.get("query")
        context["active"] = 'news'
        context["hide_search"] = True
        context["users_list"] = get_user_model().objects.filter(
            Q(username__icontains=query) | Q(
                first_name__icontains=query)).distinct()
        context["users_count"] = context["users_list"].count()
        #context['following'] = Follow.objects.following(self.request.user)
        
        return context


# For autocomplete suggestions
@login_required
@ajax_required
def get_suggestions(request):
    # Convert users, articles, questions objects into list to be
    # represented as a single list.
    query = request.GET.get('term', '')
    users = list(get_user_model().objects.filter(
        Q(username__istartswith=query) | Q(username__istartswith=query)))
    
    # Add all the retrieved users, articles, questions to data_retrieved
    # list.
    data_retrieved = users
    results = []
    for data in data_retrieved:
        data_json = {}
        if isinstance(data, get_user_model()):
            data_json['id'] = data.id
            data_json['label'] = data.username
            data_json['value'] = data.username


        results.append(data_json)
    output = {'suggestions':results}
    return JsonResponse(output)

    


