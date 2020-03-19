from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
# from knox import views as knox_views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token


urlpatterns = [
    path('api/auth', include('knox.urls')),
    # path('api/auth/register', RegisterAPI.as_view()),
    # path('api/auth/login', LoginAPI.as_view()),
    # path('api/auth/user', UserAPI.as_view()),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/token/', obtain_jwt_token),
    path('api/token/verify/', verify_jwt_token),
    path('api/token/refresh/', refresh_jwt_token),
]
