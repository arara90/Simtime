import boto3

from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, authentication

# "AWS_ACCESS_KEY_ID": get_secret('AWS_ACCESS_KEY_ID'),
# "AWS_SECRET_ACCESS_KEY": get_secret('AWS_SECRET_ACCESS_KEY'),
# "AWS_STORAGE_BUCKET_NAME": get_secret('AWS_STORAGE_BUCKET_NAME'),
# "AWS_REGION": get_secret('AWS_REGION'),
# "AWS_DEFAULT_ACL": None,
# "AWS_S3_CUSTOM_DOMAIN": f'{get_secret("AWS_STORAGE_BUCKET_NAME")}.s3.{get_secret("AWS_REGION")}.amazonaws.com',
# "AWS_S3_OBJECT_PARAMETERS": {'CacheControl': 'max-age=86400'},
# "DEFAULT_FILE_STORAGE": 'config.asset_storage.MediaStorage'


# class FileToURL(APIView):

#     S3 = settings.S3
#     s3_client = boto3.client(
#      's3',
#       aws_access_key_id={S3.AWS_ACCESS_KEY_ID},
#       aws_secret_access_key={S3.AWS_SECRET_ACCESS_KEY}
#      )

#     def post(self, request):
#        for file in request.FILES.getlist('file'):
#             self.s3_client.upload_fileobj(
#                 file,
#                 {S3.AWS_STORAGE_BUCKET_NAME},
#                 file.name,
#                 ExtraArgs={
#                     "ContentType": file.content_type
#                 }
#             )

#         file_urls = [f"https://s3.{S3.AWS_REGION}.amazonaws.com/{S3.AWS_STORAGE_BUCKET_NAME}/{file.name}" for file in request.FILES.getlist('file')]
#         return JsonResponse({'files': file_urls}, status=200)

class FileToURL(APIView):

    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

    S3 = settings.S3
    s3_client = boto3.client(
        's3',
        aws_access_key_id={S3["AWS_ACCESS_KEY_ID"]},
        aws_secret_access_key={S3["AWS_SECRET_ACCESS_KEY"]}
    )

    def post(self, request):
        for file in request.FILES.getlist('file'):
            self.s3_client.upload_fileobj(
                file,
                {S3["AWS_STORAGE_BUCKET_NAME"]},
                file.name,
                ExtraArgs={
                    "ContentType": file.content_type
                }
            )

        # file_urls = [
        #     f"https://s3.{S3["AWS_REGION"]}.amazonaws.com/{S3["AWS_STORAGE_BUCKET_NAME"]}/{file.name}" for file in request.FILES.getlist('file')]

        return Response({'files': "jee"}, status=200)
