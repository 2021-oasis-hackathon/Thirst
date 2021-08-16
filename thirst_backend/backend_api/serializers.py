from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping

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

class TourlistSerializer(serializers.Serializer):
    tour_name = serializers.CharField()
    tour_img = serializers.ImageField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    tour_addr = serializers.CharField()

class TourlistdetailSerializer(serializers.Serializer):
    tour_name = serializers.CharField()
    tour_desc = serializers.CharField()
    tour_img = serializers.ImageField()
    tour_desc = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()
    tour_addr = serializers.CharField()
    tour_phone_num = serializers.CharField()