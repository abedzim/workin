from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import CreateView, ListView, UpdateView, DetailView
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _

from helpers import AuthorRequiredMixin
from .models import Article
from .forms import ArticleForm
from tracking_analyzer.models import Tracker


class ArticlesListView(ListView):
    """Basic ListView implementation to call the published articles list."""
    model = Article
    paginate_by = 15
    context_object_name = "articles"
    template_name = 'articles/blog-list-wo-sidebar.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['popular_tags'] = Article.objects.get_counted_tags()
        return context

    def get_queryset(self, **kwargs):
        return Article.objects.get_published()


class DraftsListView(ArticlesListView):
    """Overriding the original implementation to call the drafts articles
    list."""
    def get_queryset(self, **kwargs):
        return Article.objects.get_drafts()


class CreateArticleView(LoginRequiredMixin, CreateView):
    """Basic CreateView implementation to create new articles."""
    model = Article
    message = _("Your article has been created.")
    form_class = ArticleForm
    template_name = 'martor/custom_form.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        messages.success(self.request, self.message)
        return reverse('articles:list')


class EditArticleView(LoginRequiredMixin, AuthorRequiredMixin, UpdateView):
    """Basic EditView implementation to edit existing articles."""
    model = Article
    message = _("Your article has been updated.")
    form_class = ArticleForm
    template_name = 'articles/article_update.html'

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        messages.success(self.request, self.message)
        return reverse('articles:list')


class DetailArticleView(DetailView):
    """Basic DetailView implementation to call an individual article."""
    model = Article
    def get_object(self, queryset=None):
        # Retrieve the blog post just using `get_object` functionality.
        obj = super(DetailArticleView, self).get_object(queryset)

        # Track the users access to the blog by post!
        Tracker.objects.create_from_request(self.request, obj)

        return obj



