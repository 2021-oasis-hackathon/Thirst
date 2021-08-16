from django.shortcuts import render

# from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import request
from rest_framework import response
from rest_framework.decorators import action, parser_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from drf_spectacular.views import extend_schema, OpenApiTypes, OpenApiParameter
from user.models import (
    Customer,
    Owner,
    User,
)
from user.serializers import (
    CheckUsernameSerializer,
    OwnerCreateSerializer,
    CustomerCreateSerializer,
    CustomerSerializer,
    OwnerSerializer,
    UserSerializer,
    NamePhoneSerializer,
)

@permission_classes([AllowAny])
@extend_schema(tags=["api"], summary="유저 API", description="유저 API")
class UserViewsets(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer

    @extend_schema(request=CheckUsernameSerializer,summary="중복확인 API")
    @action(methods=['POST'], detail=False)
    def double_check(self,request):
        
        username=request.data.get('username')
        if username:
            if User.objects.filter(username=username).exists():
                return Response('exist')
            else:
                return Response('ok')
        return Response('wrong val')

    @extend_schema(summary="유저 API", description="현재 로그인한 유저의 이름,전화번호")
    @action(methods=['GET'], detail=False)
    def auth_user(self, request):
        qs=request.user
        if request.user.is_authenticated:
            serializer = NamePhoneSerializer(qs, many=False)
            return Response(serializer.data)

@permission_classes([AllowAny])
@extend_schema(tags=["api"], summary="이용자 API", description="이용자 API")
class CustomerViewsets(viewsets.ModelViewSet):
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return CustomerSerializer
        elif self.request.method in ['POST']:
            return CustomerCreateSerializer
        return CustomerSerializer


@permission_classes([AllowAny])
@extend_schema(tags=["api"], summary="사업자 API", description="사업자 API")
class OwnerViewsets(viewsets.ModelViewSet):
    queryset=Owner.objects.all()
    serializer_class=OwnerSerializer
    
    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return OwnerSerializer
        elif self.request.method in ['POST']:
            return OwnerCreateSerializer
        return OwnerSerializer
