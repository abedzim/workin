from django.contrib import admin
from .models import Share


@admin.register(Share)
class NewseAdmin(admin.ModelAdmin):
    list_display = ('content', 'user', 'reply')
    list_filter = ('timestamp', 'reply')
