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
)

@permission_classes([AllowAny])
@extend_schema(tags=["api"], summary="유저 API", description="유저 API")
class UserViewsets(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    # parser_classes('multipart/form-data')
    @extend_schema(request=CheckUsernameSerializer,summary="중복확인 API")
    @action(methods=['POST'], detail=False)
    def double_check(self,request):
        
        username=request.data.get('username')#리퀘스트에있는 시리얼라이저 변수를 가져오는것
        if username:
            if User.objects.filter(username=username).exists():
                return Response('exist')
            else:
                return Response('ok')
        return Response('wrong val')

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
