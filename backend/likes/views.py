from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.models import User
from annoying.decorators import ajax_request
from . models import Like
from posts.models import PPost


def likes(request, pk):
    post = PPost.objects.get(pk=pk)
    profiles = Like.objects.filter(post=post)
    profiles = User.objects.filter(like__in=profiles)
    context = {
        'header': 'Likes',
        'profiles': profiles
    }
    return render(request, 'profile/follow_list.html', context)


@ajax_request
@login_required
def add_like(request):
    post_pk = request.POST.get('post_pk')
    post = PPost.objects.get(pk=post_pk)
    try:
        like = Like(post=post, user=request.user)
        like.save()
        result = 1
    except Exception as e:
        like = Like.objects.get(post=post, user=request.user)
        like.delete()
        result = 0

    return {
        'result': result,
        'post_pk': post_pk
    }

