from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name='index'),
    path('api/csrf-token/', get_csrf_token),

    path('api/category/', CategoryView.as_view()),
    path('api/category/<int:pk>/', CategoryView.as_view()),
    path('api/category/<slug:slug>/', CategoryView.as_view()),

    path('api/product-type/', ProductTypeView.as_view()),
    path('api/product-type/<int:pk>/', ProductTypeView.as_view()),

    path('api/sub-category/', SubCategoryView.as_view()),
    path('api/sub-category/<int:pk>/', SubCategoryView.as_view()),
    path('api/sub-category/<slug:slug>/', SubCategoryView.as_view()),

    path('api/popular-product/', PopularProductView.as_view()),
    path('api/popular-product/<int:pk>', PopularProductView.as_view()),

    path('api/promotions/', PromotionView.as_view()),
    path('api/promotions/<int:pk>', PromotionView.as_view()),
    path('api/promotions/<slug:slug>', PromotionView.as_view()),

    path('api/phones/', PhoneView.as_view()),
    path('api/phones/<int:pk>', PhoneView.as_view()),

    path('api/emails/', EmailView.as_view()),
    path('api/emails/<int:pk>', EmailView.as_view()),

    path('api/address/', AddressView.as_view()),
    path('api/address/<int:pk>', AddressView.as_view()),

    path('api/contacts/', ContactsView.as_view()),

    path('api/working-hours/', WorkingHoursView.as_view()),
    path('api/working-hours/<int:pk>', WorkingHoursView.as_view()),

    path('api/gallery/', GalleryView.as_view()),
    path('api/gallery/<int:pk>', GalleryView.as_view()),
    path('api/gallery/<slug:slug>', GalleryView.as_view()),

    path('api/characteristic/', CharacteristicView.as_view()),
    path('api/characteristic/<int:pk>', CharacteristicView.as_view()),

    path('api/product/', ProductView.as_view()),
    path('api/product/<int:pk>', ProductView.as_view()),
    path('api/product/<slug:slug>', ProductView.as_view()),

    path('api/classify/', ClassificationsView.as_view()),
]

