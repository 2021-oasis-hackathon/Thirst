from django.shortcuts import render

# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.views import extend_schema, OpenApiTypes, OpenApiParameter
from backend_api.models import (
    Tour,
    Review,
    Reserv,
)
from backend_api.serializers import (
    TourSerializer,
    ReviewSerializer,
    ReservSerializer,
    TourlistSerializer,
)

@extend_schema(tags=["api"], summary="관광지 API", description="관광지 API")
class TourViewsets(viewsets.ModelViewSet):
    queryset=Tour.objects.all()
    serializer_class=TourSerializer

    @extend_schema(request=TourlistSerializer,summary="tour_list API")
    @action(methods=['GET'], detail=False)
    def show_list(self,request):
        pass
        username=request.data.get('username')#리퀘스트에있는 시리얼라이저 변수를 가져오는것

    @extend_schema(request=TourlistSerializer,summary="tour_list API")
    @action(methods=['GET'], detail=True)
    def show_list_detail(self,request):
        pass
        username=request.data.get('username')#리퀘스트에있는 시리얼라이저 변수를 가져오는것


@extend_schema(tags=["api"], summary="리뷰 API", description="리뷰 API")
class ReviewViewsets(viewsets.ModelViewSet):
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer
    pass

@extend_schema(tags=["api"], summary="예약 API", description="예약 API")
class ReservViewsets(viewsets.ModelViewSet):
    queryset=Reserv.objects.all()
    serializer_class=ReservSerializer
    pass