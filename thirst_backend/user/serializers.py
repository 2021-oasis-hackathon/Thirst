from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping

from django.contrib.auth.hashers import make_password
from .models import Owner,Customer,User


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
                password=make_password(validation_data.get('password')),
            )


class OwnerSerializer(ModelSerializer):
    class Meta:
        model=Owner
        fields='__all__'

class CustomerSerializer(ModelSerializer):
    class Meta:
        model=Customer
        fields='__all__'
