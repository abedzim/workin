from django import forms

from pagedown.widgets import PagedownWidget
from martor.fields import MartorFormField
from .models import Post
from places.fields import PlacesField

class PostForm(forms.ModelForm):
    content = MartorFormField()
    class Meta:
        model = Post
        fields = [
            "title",
            "content",
            "category",
            "job_type",
            "price",
            "location",
            "skills",
        ]
