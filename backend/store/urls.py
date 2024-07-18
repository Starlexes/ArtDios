from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
#router.register(r'category', CategoryViewSet, 'category')
router.register(r'product-type', ProductTypeViewSet, 'product-type')
router.register(r'sub-category', SubCategoryViewSet, basename='sub-category') 
router.register(r'product', ProductViewSet, basename='product')
router.register(r'characteristic', CharacteristicViewSet, basename='characteristic') 
router.register(r'promotion', PromotionViewSet, basename='promotion')
router.register(r'popular-product', PopularProductViewSet, basename='popular-product')
router.register(r'gallery', GalleryViewSet, basename='gallery')
router.register(r'contacts', ContactsViewSet, basename='contacts')
router.register(r'phone', PhoneViewSet, basename='phone')
router.register(r'email', EmailViewSet, basename='email')
router.register(r'address', AddressViewSet, basename='address')

urlpatterns = [
    path('', index, name='index'),
    path('api/', include(router.urls)),
    path('api/category/<str:identifier>/', CategoryView.as_view()),
    path('api/category/', CategoryView.as_view())
]

