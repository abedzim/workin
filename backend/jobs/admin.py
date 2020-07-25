from django.contrib import admin

# Register your models here.
from .models import Post, Category

class PostModelAdmin(admin.ModelAdmin):
	readonly_fields = [
        'ip_address', 'ip_country', 'ip_code', 'ip_region',
        'ip_city'
        ]

	list_filter = [
        'ip_city', 'user'
        ]

	class Media:
            js = [
            'admin/js/vendor/d3/d3.min.js',
            'admin/js/vendor/topojson/topojson.min.js',
            'admin/js/vendor/datamaps/datamaps.world.min.js',
            'admin/js/vendor/d3-tip/d3-tip.min.js'
            ]
	list_display = ["title", "updated", "timestamp"]
	list_display_links = ["updated"]
	list_editable = ["title"]
	list_filter = ["updated", "timestamp"]

	search_fields = ["title", "content"]
	class Meta:
		model = Post


admin.site.register(Post, PostModelAdmin)
admin.site.register(Category)
