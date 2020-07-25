from django.contrib import admin
from .models import Answer, Question, Vote

admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(Vote)

