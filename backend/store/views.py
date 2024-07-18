from django.shortcuts import render, get_object_or_404 
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
from .serializers import *

# Create your views here.
def index(request):
    return render(request, 'react/index.html')

class CategoryView(APIView):
    def get(self, request, identifier=None):
        if not identifier:
            obj = Category.objects.all()
            obj = CategorySerializer(obj, many=True)
            return Response(obj.data)
        
        if identifier.isdigit():
            obj = get_object_or_404(Category, id=identifier)
        else:
            obj = get_object_or_404(Category, slug=identifier)
        
        obj = CategorySerializer(obj)

        return Response(obj.data)

class ProductTypeViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = ProductTypeSerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CharacteristicViewSet(viewsets.ModelViewSet):
    queryset = Characteristic.objects.all()
    serializer_class = CharacteristicSerializer

class PromotionViewSet(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer

class PopularProductViewSet(viewsets.ModelViewSet):
    queryset = PopularProduct.objects.all()
    serializer_class = PopularProductSerializer

class GalleryViewSet(viewsets.ModelViewSet):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class ContactsViewSet(viewsets.ModelViewSet):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializer

class PhoneViewSet(viewsets.ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer

class EmailViewSet(viewsets.ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer