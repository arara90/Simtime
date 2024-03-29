from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPair, TokenVerify\
     , AccountDetailAPI, AccountSearchAPI, AccountCreateAPI, AccountLoadAPI\
     ,FriendshipAPI, FriendshipDetailAPI, GroupAPI, GroupDetailAPI, FGMapAPI, GroupMemberAPI

# data = {'token': token}
# valid_data = VerifyJSONWebTokenSerializer().validate(data)
# user = valid_data['user']


urlpatterns = [
    # path('api/auth', include('knox.urls')),
    # path('api/auth/register', RegisterAPI.as_view()),
    # path('api/auth/login', LoginAPI.as_view()),
    # path('api/auth/user', UserAPI.as_view()),
    # path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'),

    path('api/token/obtain/', ObtainTokenPair.as_view(), name='token_create'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'),
    path('api/token/verify/', TokenVerify.as_view(), name='token_verify'),

    path('api/auth/account/', AccountLoadAPI.as_view(), name='account_load'),
    path('api/auth/register', AccountCreateAPI.as_view(), name="account_create"),
    path('api/auth/<int:pk>', AccountDetailAPI.as_view(), name="account_detail"),
    path('api/account/<str:field>/<str:keyword>',
         AccountSearchAPI.as_view(), name="account_search"),

    # path('api/auth/register/', AccountCreateAPI.as_view(), name="account_create"),
    # path('api/auth/<int:pk>/', AccountDetailAPI.as_view(), name="account_detail"),

    # friend(=relationship)
    path('api/friend/create/', FriendshipAPI.as_view(), name='friend_create'),
    path('api/friends/', FriendshipAPI.as_view(), name='friends'),
    path('api/friend/<int:pk>', FriendshipDetailAPI.as_view(), name="friend_detail"),
    path('api/friend/add-to-group/', FGMapAPI.as_view(), name='group_add_to'),

    # groups
    path('api/groups/', GroupAPI.as_view(), name='groups'),
    path('api/groups/create/', GroupAPI.as_view(), name='group_create'),
    path('api/group/<int:pk>/', GroupDetailAPI.as_view(), name="group_detail"),
    path('api/groupmember/<int:pk>/',
         GroupMemberAPI.as_view(), name="group_member"),

    # bulk delete
    path('api/groupmember/<str:ids>/', FGMapAPI.as_view(), name="group_member"),

]
