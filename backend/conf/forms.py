from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
#from haystack.forms import FacetedSearchForm
from haystack.forms import SearchForm


class SignUpForm(UserCreationForm):
    email = forms.CharField(max_length=254, required=True, widget=forms.EmailInput())
    class Meta:
        model = User
        widgets = {
            'username': forms.TextInput(attrs={'placeholder':"Nom d'utilisateur"}),
            'email': forms.TextInput(attrs={'placeholder':'Couriel'}),
            'first_name': forms.TextInput(attrs={'placeholder':'Prénom'}),
            'last_name': forms.TextInput(attrs={'placeholder':'Nom de famille'}),
            'password1' : forms.TextInput(attrs={'placeholder':'Mot de passe'}),
            'password2' : forms.TextInput(attrs={'placeholder':'Date de naissance'})
        }
        fields = ('username', 'email','first_name', 'last_name', 'password1', 'password2')
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.helper = FormHelper()
            self.helper.form_show_labels = False 
            self.helper.layout = Layout(
                
                Row(
                    Column('username', css_class='form-group col-md-12 mb-0'),
                    css_class='form-row'
                ),

                 
                 Row(
                    Column('email', css_class='form-group col-md-12 mb-0'),
                    css_class='form-row'
                ),
                
                Row(
                    Column('first_name', css_class='form-group col-md-12 mb-0'),
                    css_class='form-row'
                ),

                Row(
                    Column('last_name', css_class='form-group col-md-12 mb-0'),
                    css_class='form-row'
                ),
                
                Row(
                    Column('password1', css_class='form-group col-md-6 mb-0'),
                    Column('password2', css_class='form-group col-md-6 mb-0'),
                    css_class='form-row'
                ),
      
                Submit('submit', 'Sign up')
            )



# class FacetedPersonSearchForm(FacetedSearchForm):
#     def __init__(self, *args, **kwargs):
#         data = dict(kwargs.get("data", []))
#         self.genres = data.get('username', [])
#         super(FacetedPersonSearchForm, self).__init__(*args, **kwargs)

#     def search(self):
#         sqs = super(FacetedPersonSearchForm, self).search()
#         if self.genres:
#             query = None
#             for username in self.genres:
#                 if query:
#                     query += u' OR '
#                 else:
#                     query = u''
#                 query += u'"%s"' % sqs.query.clean(genres)
#             sqs = sqs.narrow(u'genre_exact:%s' % query)
#         return sqs




    
