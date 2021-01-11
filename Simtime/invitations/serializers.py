from rest_framework import serializers
from .models import Invitation, Event
# from .models import  Event
from accounts.serializers import UserSerializer
from datetime import datetime



class InvitationSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = super().to_representation(instance)
        res.update({'event': EventSerializer(instance.event).data})
        return res

    def to_internal_value(self, data):
        isInt = isinstance(data['event'], int)
        if(not isInt):
            data['event'] = data['event']['id']

        return super().to_internal_value(data)

    class Meta:
        model = Invitation
        fields = '__all__'


 
class EventSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        res = super().to_representation(instance)
        res.update({'host': UserSerializer(instance.host).data})
        return res

    class Meta:
        model = Event
        fields = '__all__'



