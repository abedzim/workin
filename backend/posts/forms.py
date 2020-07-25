from django import forms
from .models import PPost


class MakePostForm(forms.ModelForm):
    class Meta:
        model = PPost
        fields = [
            "content",
            "image",
        ]
