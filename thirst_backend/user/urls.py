from django.urls import path, include
from rest_framework.routers import DefaultRouter
from user.views import (
    CustomerViewsets,
    OwnerViewsets
)

router = DefaultRouter()
router.register(r'Customer',CustomerViewsets)
router.register(r'Owner',OwnerViewsets)


urlpatterns = [
    path(r'', include(router.urls)),
]