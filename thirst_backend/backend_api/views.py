from django.shortcuts import render
from django.utils import translation

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
    TourlistdetailSerializer,
    SearchThemeSerializer,
)

@extend_schema(tags=["api"], summary="관광지 API", description="관광지 API")
class TourViewsets(viewsets.ModelViewSet):
    queryset=Tour.objects.all()
    serializer_class=TourSerializer
    lookup_field='tour_name'
    
    @extend_schema(summary="tour_list API")
    @action(methods=['GET'], detail=False)
    def show_list(self,request):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = TourlistSerializer(queryset, many=True)
        return Response(serializer.data)

    @extend_schema(summary="tour_list_detail API")
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = TourlistdetailSerializer(instance)
        return Response(serializer.data)
        
    @extend_schema(request=SearchThemeSerializer, summary="tour_seach_theme API")
    @action(methods=['POST'], detail=False)
    def seach_theme(self,request):
        theme = request.data.get('theme')
        
        if theme:
            res=Tour.objects.filter(tour_theme=theme)
            serializer=TourlistSerializer(res,many=True)
            return Response(serializer.data)
        return Response('worng val')


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