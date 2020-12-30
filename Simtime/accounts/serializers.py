from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import Account, Relationship, FriendGroup, Relationship_FriendGroup_MAP, Friendship


class AccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = Account
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # password = validated_data.pop('password', None)
        password = validated_data['password']
        account = self.Meta.model(**validated_data)
        # as long as the fields are the same, we can just use this
        # or Use : instance = Account(email=validated_data['email'],username=validated_data['username'])
        if password is not None:
            account.set_password(password)
        # deserialized : json -> object(Account 모델 타입)으로 변환된 객체를 불러온다.
        account.save()
        return account


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'profile_image')


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


# Relationship
class RelationshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Relationship
        fields = '__all__'


class FriendSerializer(serializers.ModelSerializer):
    # friend = UserSerializer()
    # relationshipId = serializers.IntegerField(source='id')
    
    def to_representation(self, instance):
        res = {'RGmapId': instance.id}
        relationship = FriendSerializer(instance.relationship).data
        res.update(relationship) 
        return res

    class Meta:
        model = Relationship
        fields = ('relationshipId', 'friend', 'subscribe', 'dispatch')

class TempFriendSerializer(serializers.ModelSerializer):
    # friend = UserSerializer()
    # relationshipId = serializers.IntegerField(source='id')
    class Meta:
        model = Friendship
        fields = '__all__'




# Group
class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendGroup
        fields = ('id', 'groupname', 'account')
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=FriendGroup.objects.all(), fields=['account', 'groupname'], message=("already exists"))
        ]


# Relationship-Group
class RGMapSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = {'RGmapId': instance.id}
        relationship = FriendSerializer(instance.relationship).data
        res.update(relationship) 
        return res

    class Meta:
            model = Relationship_FriendGroup_MAP
            fields = '__all__'


class GroupMemberSerializer(serializers.ModelSerializer):
    # RGmapId = serializers.IntegerField(source='id')
    # relationship = FriendSerializer()
    def to_representation(self, instance):
        res = {'RGmapId': instance.id}
        relationship = FriendSerializer(instance.relationship).data
        res.update(relationship) 
        return res

    class Meta:
        model = Relationship_FriendGroup_MAP
        fields = '__all__'
