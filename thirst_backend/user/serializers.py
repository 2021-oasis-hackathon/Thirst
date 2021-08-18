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
            'password',
            'name',
            'phone',
            'profile_img',
        )

    def create(self,validation_data):

        return Owner.objects.create(
            username=validation_data.get('username'),
            password=make_password(validation_data.get('password')),
            name=validation_data.get('name'),
            phone=validation_data.get('phone'),
            profile_img=validation_data.get('profile_img'),
            
        )

class CustomerCreateSerializer(ModelSerializer):
    class Meta:
        model=Customer
        fields=(
            'username',
            'password',
            'name',
            'phone',
            'profile_img',
        )

    def create(self,validation_data):
        temp_img=validation_data.get('profile_img')
        if temp_img:
            return Customer.objects.create(
                username=validation_data.get('username'),
                password=make_password(validation_data.get('password')),
                name=validation_data.get('name'),
                phone=validation_data.get('phone'),
                profile_img=temp_img,
            )
        else:
            return Customer.objects.create(
                username=validation_data.get('username'),
                password=make_password(validation_data.get('password')),
                name=validation_data.get('name'),
                phone=validation_data.get('phone'),
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

class UserinfoSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=(
            'username',
            'name',
            'phone',
            'credit',
            'profile_img',
        )
