from django import forms

from pagedown.widgets import PagedownWidget
from martor.fields import MartorFormField
from .models import Share


class ShareForm(forms.ModelForm):
    class Meta:
        model = Share
        fields = [
            "content",
            "image",
        ]
