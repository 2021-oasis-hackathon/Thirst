from django.shortcuts import render

# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.views import extend_schema, OpenApiTypes, OpenApiParameter
from backend_api.models import (
    # User,
    # Customer,
    # Owner,
    Tour,
    Review,
    Reserv,
)
from backend_api.serializers import (
    # OwnerCreateSerializer,
    # CustomerCreateSerializer,
    # CustomerSerializer,
    # OwnerSerializer,
    TourSerializer,
    ReviewSerializer,
    ReservSerializer,
)

# @permission_classes([AllowAny])
# @extend_schema(tags=["api"], summary="이용자 API", description="이용자 API")
# class CustomerViewsets(viewsets.ModelViewSet):
#     queryset=Customer.objects.all()
#     serializer_class=CustomerSerializer

#     def get_serializer_class(self):
#         if self.request.method in ['GET']:
#             return CustomerSerializer
#         elif self.request.method in ['POST']:
#             return CustomerCreateSerializer
#         return CustomerSerializer
#     pass

# @permission_classes([AllowAny])
# @extend_schema(tags=["api"], summary="사업자 API", description="사업자 API")
# class OwnerViewsets(viewsets.ModelViewSet):
#     queryset=Owner.objects.all()
#     serializer_class=OwnerSerializer
    
#     def get_serializer_class(self):
#         if self.request.method in ['GET']:
#             return OwnerSerializer
#         elif self.request.method in ['POST']:
#             return OwnerCreateSerializer
#         return OwnerSerializer
    

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