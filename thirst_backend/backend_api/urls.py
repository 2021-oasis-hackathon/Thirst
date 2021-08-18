from django.urls import path, include
from rest_framework.routers import DefaultRouter
from backend_api.views import (
    TourViewsets,
    ReviewViewsets,
    ReservViewsets,
    # ReservOnedayViewsets,
)

router = DefaultRouter()
# router.register(r'Customer',views.CustomerViewsets)
# router.register(r'Owner',views.OwnerViewsets)
router.register(r'Tour',TourViewsets)
router.register(r'Review',ReviewViewsets)
router.register(r'Reserv',ReservViewsets)
# router.register(r'ReservOneday',ReservOnedayViewsets)

urlpatterns = [
    path(r'', include(router.urls)),
]