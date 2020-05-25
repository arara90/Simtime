from django.conf.urls import url
from django.views.generic.base import TemplateView
from files.views import FilePolicyAPI, FileUploadCompleteHandler

urlpatterns = [
    url(r'^upload/$', TemplateView.as_view(template_name='upload.html'), name='upload-home'),
    url(r'^api/files/complete/$', FileUploadCompleteHandler.as_view(), name='upload-complete'),
    url(r'^api/files/policy/$', FilePolicyAPI.as_view(), name='upload-policy'),
]
