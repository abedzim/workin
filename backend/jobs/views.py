try:
    from urllib import quote_plus #python 2
except:
    pass

try:
    from urllib.parse import quote_plus #python 3
except: 
    pass

from django.contrib import messages
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from django.contrib.gis.geoip2 import GeoIP2, GeoIP2Exception
from django.http import HttpRequest
from django.db.models import Q
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.shortcuts import render, get_object_or_404, redirect
from django.utils import timezone
from .filters import JobFilter
from tracking_analyzer.models import Tracker

from django.views.generic import ListView

from django.contrib.auth.decorators import login_required


from .forms import PostForm
from .models import Post
from .filters import JobFilter
from fm.views import AjaxCreateView, AjaxUpdateView, AjaxDeleteView
from django.core.paginator import Paginator

def post_create(request):
		
	form = PostForm(request.POST or None, request.FILES or None)
	if form.is_valid():
		instance = form.save()
		instance.user = request.user
		
		#instance.ip_address = '82.242.252.1'
		geo = GeoIP2()
		city = geo.city('2a01:e35:2f2f:c010:39b3:27fb:2f37:93e7')
		instance.ip_city=city.get('city', '') or '',
		instance.ip_region=city.get('postal_code', '') or '',
		instance.ip_code=city.get('region', '') or '',
		instance.save()
		# message success
		messages.success(request, "Successfully Created")
		return HttpResponseRedirect(instance.get_absolute_url())
	context = {
		"form": form,
	}
	#Post.objects.create_from_request(request, instance)

	return render(request, "martor/custom_form.html", context)

class JobCreateView(AjaxCreateView):
    
    form_class = PostForm
    
def post_detail(request, slug=None):
	instance = get_object_or_404(Post, slug=slug)
	#if instance.timestamp > timezone.now().date() or instance.draft:
		#if not request.user.is_staff or not request.user.is_superuser:
			#raise Http404
	share_string = quote_plus(instance.content)
        

	initial_data = {
			"content_type": instance.get_content_type,
			"object_id": instance.id
	}
	


	context = {
		"title": instance.title,
		"instance": instance,
		"share_string": share_string,
	}
	Tracker.objects.create_from_request(request, instance)
        
	return render(request, "post_detail.html", context)

def search(request):
    job_list = Post.objects.all()
    job_featured = Post.objects.filter(featured=True).order_by('?')[:1]
    all_list = job_list.union(job_featured)
    job_filter = JobFilter(request.GET, queryset=job_list).qs
    job_filters = JobFilter(request.GET, queryset=job_list)
    paginator = Paginator(job_filter, 10)

    page = request.GET.get('page')
    try:
        response = paginator.page(page)
    except PageNotAnInteger:
        response = paginator.page(1)
    except EmptyPage:
        response = paginator.page(paginator.num_pages)
    
    return render(request, 'search/user_list.html', {'response': response, 'filter':job_filters, 'featured':job_featured})

class Jobfilt (ListView):
    model = Post
    template_name = 'search/user_list.html'
    paginate_by = 10

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filter'] = JobFilter(self.request.GET, queryset=self.get_queryset())
        return context


def post_list(request):
	today = timezone.now().date()
	queryset_list = Post.objects.active() #.order_by("-timestamp")
	#if request.user.is_staff or request.user.is_superuser:
		#queryset_list = Post.objects.all()
	
	query = request.GET.get("q")
	if query:
		queryset_list = queryset_list.filter(
				Q(title__icontains=query)|
				Q(content__icontains=query)|
				Q(user__first_name__icontains=query) |
				Q(user__last_name__icontains=query)
				).distinct()
	paginator = Paginator(queryset_list, 8) # Show 25 contacts per page
	page_request_var = "page"
	page = request.GET.get(page_request_var)
	try:
		queryset = paginator.page(page)
	except PageNotAnInteger:
		# If page is not an integer, deliver first page.
		queryset = paginator.page(1)
	except EmptyPage:
		# If page is out of range (e.g. 9999), deliver last page of results.
		queryset = paginator.page(paginator.num_pages)


	context = {
		"object_list": queryset, 
		"title": "List",
		"page_request_var": page_request_var,
		"today": today,
	}
	return render(request, "jobs.html", context)





@login_required
def post_update(request, slug=None):
	#if not request.user.is_staff or not request.user.is_superuser:
		#raise Http404
	instance = get_object_or_404(Post, slug=slug)
	form = PostForm(request.POST or None, request.FILES or None, instance=instance)
	if form.is_valid():
		instance = form.save(commit=False)
		instance.save()
		messages.success(request, "<a href='#'>Item</a> Saved", extra_tags='html_safe')
		return HttpResponseRedirect(instance.get_absolute_url())

	context = {
		"title": instance.title,
		"instance": instance,
		"form":form,
	}
	return render(request, "post_form.html", context)



def post_delete(request, slug=None):
	if not request.user.is_staff or not request.user.is_superuser:
		raise Http404
	instance = get_object_or_404(Post, slug=slug)
	instance.delete()
	messages.success(request, "Successfully deleted")
	return redirect("jobs:search")
