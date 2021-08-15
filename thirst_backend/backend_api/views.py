from django.shortcuts import render

# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.views import extend_schema, OpenApiTypes, OpenApiParameter
from .models import (
    User,
    Owner,
    Tour,
    Review,
    Reserv,
)
from .serializers import (
    UserSerializer,
    OwnerSerializer,
    TourSerializer,
    ReviewSerializer,
    ReservSerializer,
)


@extend_schema(tags=["api"], summary="이용자 API", description="이용자 API")
class UserViewsets(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    pass

@extend_schema(tags=["api"], summary="사업자 API", description="사업자 API")
class OwnerViewsets(viewsets.ModelViewSet):
    queryset=Owner.objects.all()
    serializer_class=OwnerSerializer
    pass

@extend_schema(tags=["api"], summary="관광지 API", description="관광지 API")
class TourViewsets(viewsets.ModelViewSet):
    queryset=Tour.objects.all()
    serializer_class=TourSerializer
    pass

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