from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import (
    CustomerViewsets,
    OwnerViewsets,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


router = DefaultRouter()
router.register(r'Customer',CustomerViewsets)
router.register(r'Owner',OwnerViewsets)


urlpatterns = [
    path(r'token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(r'token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path(r'', include(router.urls)),
]