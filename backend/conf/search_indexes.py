# import datetime
# from django.utils import timezone
# from haystack import indexes
# from haystack.fields import CharField
# from django.contrib.auth.models import User


# class PersonIndex(indexes.SearchIndex, indexes.Indexable):
#     text = indexes.EdgeNgramField(
#         document=True, use_template=True,
#         template_name='search/indexes/person_text.txt')
#     username = indexes.EdgeNgramField(model_attr='username')
    
#     content_auto = indexes.EdgeNgramField(model_attr='username')
#     suggestions = indexes.FacetCharField()
    
#     def get_model(self):
#         return User
    
#     def index_queryset(self, using=None):
#         return self.get_model().objects.all()    
