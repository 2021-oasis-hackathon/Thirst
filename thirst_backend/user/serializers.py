from django.db import models
from rest_framework import exceptions, fields
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping

from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from user.models import Owner,Customer,User


class OwnerCreateSerializer(ModelSerializer):
    class Meta:
        model=Owner
        fields=(
            'username',
            'phone',
            'name',
            'password',
        )

    def create(self,validation_data):

        return Owner.objects.create(
            username=validation_data.get('username'),
            phone=validation_data.get('phone'),
            name=validation_data.get('name'),
            password=make_password(validation_data.get('password')),
        )

class CustomerCreateSerializer(ModelSerializer):
    class Meta:
        model=Customer
        fields=(
            'username',
            'phone',
            'name',
            'password',
        )

    def create(self,validation_data):
        
        return Customer.objects.create(
            username=validation_data.get('username'),
            phone=validation_data.get('phone'),
            name=validation_data.get('name'),
            password=make_password(validation_data.get('password'))
        )


class OwnerSerializer(ModelSerializer):
    class Meta:
        model=Owner
        fields='__all__'

class CustomerSerializer(ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

class CheckUsernameSerializer(serializers.Serializer):
    username=serializers.CharField()

class NamePhoneSerializer(serializers.Serializer):
    name=serializers.CharField()
    phone=serializers.CharField()