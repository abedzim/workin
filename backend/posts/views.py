from django.shortcuts import render, get_object_or_404, redirect
from posts.models import PPost
from .forms import MakePostForm
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse


def see_post(request, id=None):
    post = get_object_or_404(PPost, id=id)
    return render(request, "post/post.html", {"post": post})


@login_required
def create_post(request):
    user_page_data = PPost(user=request.user)
    form = MakePostForm(request.POST or None, request.FILES or None, instance=user_page_data)
    if form.is_valid():
        post = form.save(commit=False)
        post.save()
        return redirect('basic:index')
    return render(request, "post/create_post.html", {"form": form})


@login_required
def edit_post(request, id=None):
    edt_post = get_object_or_404(Post, id=id)
    if request.user != edt_post.user:
        return HttpResponse("<h1>You can only edit your own posts.</h1>")
    form = MakePostForm(request.POST or None, request.FILES or None, instance=edt_post)
    if form.is_valid():
        edt_post = form.save(commit=False)
        edt_post.save()
        return redirect("userprofile:see_user", request.user.username)
    context_data = {
        "upd_post": edt_post,
        "form": form,
    }
    return render(request, "post/edit_post.html", context_data)


@login_required
def delete_post(request, id=None):
    post = get_object_or_404(PPost, id=id)
    if request.user == post.user:
        post.delete()
        return redirect("userprofile:see_user", request.user.username)
    return HttpResponse("<h1>You can only delete your own posts.</h1>")
