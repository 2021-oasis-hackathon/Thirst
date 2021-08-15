from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping
from .models import Owner,User,Tour,Review,Reserv


class OwnerSerializer(ModelSerializer):
    class Meta:
        model=Owner
        fields='__all__'

class UserSerializer(ModelSerializer):
    class Meta:
        model=User
        fields='__all__'

class TourSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields='__all__'

class ReviewSerializer(ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'

class ReservSerializer(ModelSerializer):
    class Meta:
        model=Reserv
        fields='__all__'