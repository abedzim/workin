from django import forms


from .models import Answer, Question

from martor.fields import MartorFormField


class QuestionForm(forms.ModelForm):
    status = forms.CharField(widget=forms.HiddenInput())
    content = MartorFormField()

    class Meta:
        model = Question
        fields = ["title", "content", "tags", "status"]

class AnswerForm(forms.ModelForm):
    content = MartorFormField()
 
    class Meta:
        model = Answer
        fields = ['content',]
