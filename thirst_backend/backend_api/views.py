from django.shortcuts import render
from django.utils import translation
# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.generics import RetrieveDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.views import extend_schema, OpenApiTypes, OpenApiParameter
from backend_api.models import (
    Tour,
    Review,
    Reserv,
    ReservOneday,
)
from backend_api.serializers import (
    TourSerializer,
    ReviewSerializer,
    ReservSerializer,
    TourlistSerializer,
    TourlistdetailSerializer,
    TourCreateSerializer,
    SearchThemeSerializer,
    SearchAreaSerializer,
    FindMyReservSerializer,
    ReservonedaySerializer,
    FindReservonedaySerializer,
    ReviewCreateSerializer,
    ReviewTourSerializer
)

@extend_schema(tags=["api"], summary="관광지 API", description="관광지 API")
class TourViewsets(viewsets.ModelViewSet):
    queryset=Tour.objects.all()
    serializer_class=TourSerializer
    lookup_field='tour_name'

    @extend_schema(request=TourCreateSerializer, summary="tour_create API")
    def create(self, request, *args, **kwargs):
        serializer = TourCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)


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
        
    @extend_schema(request=SearchThemeSerializer, summary="tour_search_theme API")
    @action(methods=['POST'], detail=False)
    def search_theme(self,request):
        theme = request.data.get('theme')
        if theme:
            res=Tour.objects.filter(tour_theme__contains=theme)
            serializer=TourlistSerializer(res,many=True)
            return Response(serializer.data)
        return Response('worng val')
    
    @extend_schema(request=SearchAreaSerializer, summary="tour_search_Area API")
    @action(methods=['POST'], detail=False)
    def search_Area(self,request):
        Area_name = request.data.get('Area')
        if Area_name:
            res=Tour.objects.filter(tour_addr__contains=Area_name)
            serializer=TourlistSerializer(res,many=True)
            return Response(serializer.data)
        return Response('worng val')


@extend_schema(tags=["api"], summary="리뷰 API", description="리뷰 API")
class ReviewViewsets(viewsets.ModelViewSet):
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer

    @extend_schema(request=ReviewCreateSerializer, summary="review_create API")
    def create(self, request, *args, **kwargs):
        # serializer = ReviewSerializer(data=request.data)

        Review_title=request.data.get('review_title')
        Comment=request.data.get('rcomment')
        Review_img=request.data.get('review_img')
        Satisfaction=request.data.get('Satisfaction')
        Tour_name=request.data.get('tour')
        temp_tour=Tour.objects.get(tour_name=Tour_name)
        print(request.user)
        temp=Review.objects.create(
            user=request.user,
            tour=temp_tour,
            review_title=Review_title,
            comment=Comment,
            review_img=Review_img,
            Satisfaction=Satisfaction,
        )

        return Response(ReviewCreateSerializer(temp).data)

    pass

    @extend_schema(request=ReviewTourSerializer, summary="Find_tour_review API")
    @action(methods=['POST'], detail=False)
    def FindTourReview(self, request, *args, **kwgs):
        tour = request.data.get('tour')
        if tour:
           res=Review.objects.filter(tour_name=tour)
           serializer=ReviewSerializer(res, many=True)
           return Response(serializer.data)
        return Response('wrong val')

@extend_schema(tags=["api"], summary="예약 API", description="예약 API")
class ReservViewsets(viewsets.ModelViewSet):
    queryset=Reserv.objects.all()
    serializer_class=ReservSerializer

    @extend_schema(summary="reserv api tour limit update")
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
       
        Tour_name=request.data['tour'] #post 는 request에서 data 가져옴
        Person_num=request.data['person_num']
        Reserv_time=request.data['reserv_time']
        Time_detail=request.data['reserv_time_detail']
        temp_tour_model=Tour.objects.get(tour_name=Tour_name)
        temp_tour_oneday_model=ReservOneday.objects.get(tour_name=Tour_name,reserv_time=Reserv_time)
        Time_detail_dynamic='time_'+str(Time_detail)

        if temp_tour_model.tour_person_limit-int(Person_num)<0:
            return Response('over reserv')
        else:
            temp_tour_model.tour_person_limit-=int(Person_num)
            temp_tour_model.save()
            setattr(
                temp_tour_oneday_model,
                Time_detail_dynamic,
                getattr(temp_tour_oneday_model,Time_detail_dynamic)+int(Person_num)
            )
            temp_tour_oneday_model.save()

        self.perform_create(serializer)
        return Response(serializer.data)

    @extend_schema(request=FindMyReservSerializer, summary="Find_my_reserv API")
    @action(methods=['POST'], detail=False)
    def FindMyReserv(self,request):
        Myname=request.data.get('myname')
        Reservqs=Reserv.objects.filter(user=Myname)
        tourlistser=TourlistSerializer
        
        ret=list()
        for reser in Reservqs:
            # print(reser.person_num)#외래키는 그냥 해당 키 모델로 올라가버림
            Reserv_time=reser.reserv_time
            # print(Reserv_time.strftime('%Y-%m-%d %H:%M'))
            tempdict={'Reserv_time':Reserv_time.strftime('%Y-%m-%d %H:%M')}

            tempdict.update(tourlistser(reser.tour).data)
            ret.append(tempdict)
        return Response(ret)

    @extend_schema(request=FindReservonedaySerializer,summary="reserv_one_day API")
    @action(methods=['POST'], detail=False)
    def reserv_oneday(self,request):
        tour_name=request.data.get('tour_name')
        reserv_time=request.data.get('reserv_time')
        if tour_name and reserv_time:
            queryset=ReservOneday.objects.filter(tour_name=tour_name,reserv_time__contains=reserv_time)
            if queryset:
                reserv_detailser=ReservonedaySerializer(queryset,many=True)
                return Response(reserv_detailser.data)
            else:
                tourobj=Tour.objects.get(tour_name=tour_name)
                mpao=tourobj.tour_max_person_at_one
                # print(mpao)
                # print(reserv_time)
                ReservOneday.objects.create(
                    tour_name=tourobj,
                    reserv_time=reserv_time,
                    tour_limit_person=mpao,
                    )
                self.reserv_oneday(request)

        return Response('wrong val')

# @extend_schema(tags=["api"], summary="예약_기본단위 API", description="예약 API")
# class ReservOnedayViewsets(viewsets.ModelViewSet):
#     queryset=ReservOneday.objects.all()
#     serializer_class=ReservonedaySerializer
