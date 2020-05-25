from django.shortcuts import render

# Create your views here.
import base64
import hashlib
import hmac
import os
import time
from rest_framework import permissions, status, authentication
from rest_framework.response import Response
from rest_framework.views import APIView
from .config_aws import (
    AWS_UPLOAD_BUCKET,
    AWS_UPLOAD_REGION,
    AWS_UPLOAD_ACCESS_KEY_ID,
    AWS_UPLOAD_SECRET_KEY
)
from .models import FileItem


class FilePolicyAPI(APIView):
    """
    This view is to get the AWS Upload Policy for our s3 bucket.
    What we do here is first create a FileItem object instance in our
    Django backend. This is to include the FileItem instance in the path
    we will use within our bucket as you'll see below.
    """
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

    def post(self, request, *args, **kwargs):
        # policy을 가져올 때
        # policy 뿐만 아니라 file item 그 자체도 생성한다.
        # path와 장고 db entry와도 연결
        # 이를 위해 모든 path와 object를 생성하는 등 모든 작업을 장고에서 먼저 완료한 후에, AWS에 올린다.
        #
        """
        The initial post request includes the filename
        and auth credientails. In our case, we'll use
        Session Authentication but any auth should work.
        """
        filename_req = request.data.get('filename')
        if not filename_req:
            return Response({"message": "A filename is required"}, status=status.HTTP_400_BAD_REQUEST)
        policy_expires = int(time.time()+5000)
        user = request.user
        username_str = str(request.user.username)

        """
        Below we create the Django object. We'll use this
        in our upload path to AWS. 

        Example:
        To-be-uploaded file's name: Some Random File.mp4
        Eventual Path on S3: <bucket>/username/2312/2312.mp4
        -> ID(unique)로 파일이름을 재설정해서, space와 같이 발생 가능한 이슈 예방
        """
        file_obj = FileItem.objects.create(user=user, name=filename_req)
        file_obj_id = file_obj.id

        # upload_start_path = "{username}/{file_obj_id}/".format(
        #     username=username_str,
        #     file_obj_id=file_obj_id
        # )

        upload_start_path = "{file_obj_id}/".format(
            file_obj_id=file_obj_id
        )

        _, file_extension = os.path.splitext(filename_req)
        filename_final = "{file_obj_id}{file_extension}".format(
            file_obj_id=file_obj_id,
            file_extension=file_extension

        )
        """
        Eventual file_upload_path includes the renamed file to the 
        Django-stored FileItem instance ID. Renaming the file is 
        done to prevent issues with user generated formatted names.
        """
        final_upload_path = "{upload_start_path}{filename_final}".format(
            upload_start_path=upload_start_path,
            filename_final=filename_final,
        )
        if filename_req and file_extension:
            """
            Save the eventual path to the Django-stored FileItem instance
            """
            file_obj.path = final_upload_path
            file_obj.save()

        policy_document_context = {
            "expire": policy_expires,
            "bucket_name": AWS_UPLOAD_BUCKET,
            "key_name": "",
            "acl_name": "private",
            "content_name": "",
            "content_length": 524288000,
            "upload_start_path": upload_start_path,

        }
        policy_document = """
        {"expiration": "2019-01-01T00:00:00Z",
          "conditions": [ 
            {"bucket": "%(bucket_name)s"}, 
            ["starts-with", "$key", "%(upload_start_path)s"],
            {"acl": "%(acl_name)s"},
            
            ["starts-with", "$Content-Type", "%(content_name)s"],
            ["starts-with", "$filename", ""],
            ["content-length-range", 0, %(content_length)d]
          ]
        }
        """ % policy_document_context
        aws_secret = str.encode(AWS_UPLOAD_SECRET_KEY)
        policy_document_str_encoded = str.encode(
            policy_document.replace(" ", ""))
        url = 'https://{bucket}.s3-{region}.amazonaws.com/'.format(
            bucket=AWS_UPLOAD_BUCKET,
            region=AWS_UPLOAD_REGION
        )
        policy = base64.b64encode(policy_document_str_encoded)
        signature = base64.b64encode(
            hmac.new(aws_secret, policy, hashlib.sha1).digest())
        data = {
            "policy": policy,
            "signature": signature,
            "key": AWS_UPLOAD_ACCESS_KEY_ID,
            "file_bucket_path": upload_start_path,
            "file_id": file_obj_id,
            "filename": filename_final,
            "url": url,
            "username": username_str,
        }
        return Response(data, status=status.HTTP_200_OK)


class FileUploadCompleteHandler(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [authentication.SessionAuthentication]

    def post(self, request, *args, **kwargs):
        file_id = request.POST.get('file')
        size = request.POST.get('fileSize')
        data = {}
        type_ = request.POST.get('fileType')
        if file_id:
            obj = FileItem.objects.get(id=int(file_id))
            obj.size = int(size)
            obj.uploaded = True
            obj.type = type_
            obj.save()
            data['id'] = obj.id
            data['saved'] = True
        return Response(data, status=status.HTTP_200_OK)


# from django.shortcuts import render
# from django.conf import settings
# from django.core.files.storage import FileSystemStorage
# from .models import Upload


# def image_upload(request):
#     if request.method == 'POST':
#         image_file = request.FILES['image_file']
#         image_type = request.POST['image_type']

#         if settings.USE_S3:
#             upload = Upload(file=image_file)
#             upload.save()
#             image_url = upload.file.url

#         else:
#             fs = FileSystemStorage()
#             filename = fs.save(image_file.name, image_file)
#             image_url = fs.url(filename)

#         return render(request, 'upload.html', {
#             'image_url': image_url
#         })

#     return render(request, 'upload.html')
