from rest_framework import fields, serializers
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

class TourlistSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields=(
            'tour_name',
            'tour_img',
            'start_time',
            'end_time',
            'tour_addr', 
            'tour_theme',
        )

class TourlistdetailSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields=(
            'tour_name',
            'tour_desc', 
            'tour_img',
            'tour_desc',
            'start_time',
            'end_time',
            'tour_addr', 
            'tour_phone_num',
        )
        lookup_field = "tour_name"

class SearchThemeSerializer(serializers.Serializer):
    theme=serializers.CharField()