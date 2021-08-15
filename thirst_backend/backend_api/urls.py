from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'User',views.UserViewsets)
router.register(r'Owner',views.OwnerViewsets)
router.register(r'Tour',views.TourViewsets)
router.register(r'Review',views.ReviewViewsets)
router.register(r'Reserv',views.ReservViewsets)

urlpatterns = [
    path(r'', include(router.urls)),
]