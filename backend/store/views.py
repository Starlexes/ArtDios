from django.shortcuts import render, get_object_or_404 
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

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
    
class PopularProductView(APIView):

    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None):
        if pk:
            obj = get_object_or_404(PopularProduct, pk=pk)
            obj = PopularProductSerializer(obj)
            return Response(obj.data)
        
        only_show = request.GET.get('only-show', '')

        if only_show.lower() == 'true':
            
            obj = PopularProduct.objects.filter(is_show = True)
           
        else:
            obj = PopularProduct.objects.all()
        
        obj = PopularProductSerializer(obj, many=True)

        return Response(obj.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PopularProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk=None):
        if pk:
            try:
                instance = PopularProduct.objects.get(pk=pk)
            except PopularProduct.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = PopularProductSerializer(instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = request.data

        for obj_data in data:
            obj = PopularProduct.objects.get(pk=obj_data['id'])
            obj.is_show = True
            obj.save()

        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk=None):
        instance = get_object_or_404(PopularProduct, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class PromotionView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None):
        if pk:
            obj = get_object_or_404(Promotion, pk=pk)
            obj = PromotionSerializer(obj)
            return Response(obj.data)
        
        only_show = request.GET.get('only-show', '')

        if only_show.lower() == 'true':
            
            obj = Promotion.objects.filter(is_show = True)
           
        else:
            obj = Promotion.objects.all()
        
        obj = PromotionSerializer(obj, many=True)

        return Response(obj.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = PromotionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk=None):
        if pk:
            try:
                instance = Promotion.objects.get(pk=pk)
            except Promotion.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = PromotionSerializer(instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        data = request.data

        for obj_data in data:
            obj = Promotion.objects.get(pk=obj_data['id'])
            obj.is_show = True
            obj.save()

        return Response(status=status.HTTP_200_OK)
    
    def delete(self, request, pk=None):
        instance = get_object_or_404(Promotion, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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