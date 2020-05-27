from django.conf.urls import url
from django.urls import path, include
from django.views.generic.base import TemplateView
from .views import FileToURL

urlpatterns = [
    url(r'^upload/$', TemplateView.as_view(template_name='upload.html'),
        name='upload-home'),
    url(r'^api/files/complete/$', FileToURL.as_view(), name='upload-complete'),
]
