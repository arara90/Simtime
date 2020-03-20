from django.urls import path, include
# from .api import RegisterAPI, LoginAPI, UserAPI
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, HelloWorldView, UserView, LoginAPI


urlpatterns = [
    # path('api/auth', include('knox.urls')),
    # path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    # path('api/auth/user', UserAPI.as_view()),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),


    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('api/auth/user/', UserView.as_view(), name="get_user"),
    path('api/token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('api/hello/', HelloWorldView.as_view(), name='hello_world')
]
