from django.db import models
from rest_framework import fields, serializers
from rest_framework.serializers import ModelSerializer
from rest_framework.utils import field_mapping

from backend_api.models import Tour,Review,Reserv,ReservOneday


class TourSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields='__all__'

class ReviewSerializer(ModelSerializer):
    class Meta:
        model=Review
        fields='__all__'

class ReviewCreateSerializer(ModelSerializer):
    class Meta:
        model=Review
        fields=(
            'tour',
            'review_title',
            'comment',
            'review_img',
            'Satisfaction',
        )


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
            'tour_phone_num',
        )

class TourlistdetailSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields=(
            'tour_name',
            'tour_desc', 
            'tour_img',
            'start_time',
            'end_time',
            'tour_addr', 
            'tour_phone_num',
            'tour_person_limit',
            'tour_max_person_at_one',
            'tour_time_at_one',
            'tour_price'

        )
        lookup_field = "tour_name"

class TourCreateSerializer(ModelSerializer):
    class Meta:
        model=Tour
        fields=(
            'tour_name',
            'tour_desc', 
            'tour_img',
            'start_time',
            'end_time',
            'tour_addr', 
            'tour_phone_num',
            'tour_time_at_one',
            'tour_min_person_at_one',
            'tour_max_person_at_one',
            'tour_person_limit',
            'tour_price',
            'tour_theme',
            'owner',
        )

class SearchThemeSerializer(serializers.Serializer):
    theme=serializers.CharField()
    Area=serializers.CharField()

class SearchAreaSerializer(serializers.Serializer):
    Area=serializers.CharField()

class FindMyReservSerializer(serializers.Serializer):
    myname=serializers.CharField()


class ReservonedaySerializer(ModelSerializer):
    class Meta:
        model=ReservOneday
        fields='__all__'

class FindReservonedaySerializer(serializers.Serializer):
    tour_name=serializers.CharField()
    reserv_time=serializers.DateTimeField()

class ReviewTourSerializer(serializers.Serializer):
    tour=serializers.IntegerField()