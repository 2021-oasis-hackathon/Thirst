from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping

from django.contrib.auth.hashers import make_password
from backend_api.models import Tour,Review,Reserv


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