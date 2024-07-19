from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'product-type', ProductTypeViewSet, 'product-type')
router.register(r'sub-category', SubCategoryViewSet, basename='sub-category') 
router.register(r'product', ProductViewSet, basename='product')
router.register(r'characteristic', CharacteristicViewSet, basename='characteristic') 
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'contacts', ContactsViewSet, basename='contacts')
router.register(r'phone', PhoneViewSet, basename='phone')
router.register(r'email', EmailViewSet, basename='email')
router.register(r'address', AddressViewSet, basename='address')

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
    path('api/category/<str:identifier>/', CategoryView.as_view()),
    path('api/category/', CategoryView.as_view()),
    path('api/popular-product/', PopularProductView.as_view()),
    path('api/popular-product/<int:pk>', PopularProductView.as_view()),
    path('api/promotions/', PromotionView.as_view()),
    path('api/promotions/<int:pk>', PromotionView.as_view()),
]

