from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from annoying.decorators import ajax_request
from . models import PComment
from posts.models import PPost


@ajax_request
@login_required
def add_comment(request):
    comment_text = request.POST.get('comment_text')
    post_pk = request.POST.get('post_pk')
    post = PPost.objects.get(pk=post_pk)
    commenter_info = {}

    try:
        comment = PComment(comment=comment_text, user=request.user, post=post)
        comment.save()

        username = request.user.username
        profile_url = reverse('userprofile:see_user', kwargs={'user_username': username})

        commenter_info = {
            'username': username,
            'profile_url': profile_url,
            'comment_text': comment_text
        }


        result = 1
    except Exception as e:
        print(e)
        result = 0

    return {
        'result': result,
        'post_pk': post_pk,
        'commenter_info': commenter_info
    }
