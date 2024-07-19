from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'product-type', ProductTypeViewSet, 'product-type')
router.register(r'sub-category', SubCategoryViewSet, basename='sub-category') 
router.register(r'product', ProductViewSet, basename='product')
router.register(r'characteristic', CharacteristicViewSet, basename='characteristic') 

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
    path('api/category/<str:identifier>/', CategoryView.as_view()),
    path('api/category/', CategoryView.as_view()),
    path('api/popular-product/', PopularProductView.as_view()),
    path('api/popular-product/<int:pk>', PopularProductView.as_view()),
    path('api/promotions/', PromotionView.as_view()),
    path('api/promotions/<int:pk>', PromotionView.as_view()),
    path('api/phones/', PhoneView.as_view()),
    path('api/phones/<int:pk>', PhoneView.as_view()),
    path('api/emails/', EmailView.as_view()),
    path('api/emails/<int:pk>', EmailView.as_view()),
    path('api/address/', AddressView.as_view()),
    path('api/address/<int:pk>', AddressView.as_view()),
    path('api/contacts/', ContactsView.as_view()),
    path('api/contacts/<int:pk>', ContactsView.as_view()),
    path('api/gallery/', GalleryView.as_view()),
    path('api/gallery/<int:pk>', GalleryView.as_view()),
   
]

