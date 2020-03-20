from rest_framework import generics, permissions
from rest_framework.response import Response
# from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


# class RegisterAPI(generics.GenericAPIView):
#     serializer_class = RegisterSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
        
#         [_, token] = AuthToken.objects.create(user)
#         return Response({
#             "user": UserSerializer(user, context=self.get_serializer_context()).data,
#             "token": token
#         })


# class LoginAPI(generics.GenericAPIView):
#     serializer_class = LoginSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)

#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data
#         [_, token] = AuthToken.objects.create(user)

#         response = Response({
#             "user": UserSerializer(
#                 user,
#                 context=self.get_serializer_context()
#             ).data,

#             "token": token
#         })

#         response.set_cookie('token', token, httponly=True, max_age=3600) 

#         # 하루 지나면 지우기 예시, MAX_AGE는 초단위
#         # tomorrow = datetime.datetime.replace(datetime.datetime.now(), hour=23, minute=59, second=0)
#         # expires = datetime.datetime.strftime(tomorrow, "%a, %d-%b-%Y %H:%M:%S GMT")
#         # response.set_cookie(쿠키이름, 쿠키값, expires = expires)


#         return response


# class UserAPI(generics.RetrieveAPIView):
#     permission_classes = [
#         permissions.IsAuthenticated
#     ]

#     serializer_class = UserSerializer

#     def get_object(self):
#         return self.request.user
