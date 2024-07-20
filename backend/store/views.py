from django.shortcuts import render, get_object_or_404 
from django.db.models import Prefetch
from django.db import connection
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
import json

from .models import *
from .serializers import *


def get_method(request, model, model_serializer, pk=None):
    try:
        if pk:
            obj = get_object_or_404(model, pk=pk)
            obj = model_serializer(obj)
            return Response(obj.data, status=status.HTTP_200_OK)
        
        only_show = request.GET.get('only-show', '')
        
        if only_show.lower() == 'true':
            obj = model.objects.filter(is_show = True)
        else:
            obj = model.objects.all()

        obj = model_serializer(obj, many=True)

        return Response(obj.data, status=status.HTTP_200_OK)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
def post_method(request, model_serializer):
    try:
        serializer = model_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
def put_method(request, model, model_serializer, pk=None):
    try:
        if pk:
            try:
                instance = model.objects.get(pk=pk)
            except model.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            serializer = model_serializer(instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        to_show = request.GET.get('to-show', '')
        objects_data = request.data
       
        object_ids = [obj_data['id'] for obj_data in objects_data]
        objects_to_update = model.objects.filter(pk__in=object_ids)

        for obj in objects_to_update:
            if to_show.lower() == 'true':
                obj.is_show = True
            else:
                obj.is_show = False

        model.objects.bulk_update(objects_to_update, ['is_show'])

        return Response(status=status.HTTP_200_OK)
    
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
def delete_method(model, pk=None):
    try:
        instance = get_object_or_404(model, pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Exception:
        return Response(status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
def index(request):
    return render(request, 'react/index.html')


class CategoryView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Category, CategorySerializer, pk)
    
    def post(self, request):
        return post_method(request, CategorySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Category, CategorySerializer, pk=pk)

    def delete(self, request, pk=None):
        return delete_method(Category, pk=pk)

class ProductTypeView(APIView):
    def get(self, request, pk=None):
        return get_method(request, ProductType, ProductTypeSerializer, pk)
    
    def post(self, request):
        return post_method(request, ProductTypeSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, ProductType, ProductTypeSerializer, pk=pk)

    def delete(self, request, pk=None):
        return delete_method(ProductType, pk=pk)

class PopularProductView(APIView):

    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None):
        return get_method(request, PopularProduct, PopularProductSerializer, pk)
    
    def post(self, request):
        return post_method(request, PopularProductSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, PopularProduct, PopularProductSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(PopularProduct, pk)
    
class PromotionView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None):
        return get_method(request, Promotion, PromotionSerializer, pk)
    
    def post(self, request):
        return post_method(request, PromotionSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Promotion, PromotionSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Promotion, pk)
    
class PhoneView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Phone, PhoneSerializer, pk)
    
    def post(self, request):
        return post_method(request, PhoneSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Phone, PhoneSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Phone, pk)
    
class EmailView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Email, EmailSerializer, pk)
    
    def post(self, request):
        return post_method(request, EmailSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Email, EmailSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Email, pk)
    
class AddressView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Address, AddressSerializer, pk)
    
    def post(self, request):
        return post_method(request, AddressSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Address, AddressSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Address, pk)


class ContactsView(APIView):
    def get(self, request, pk=None):
        if pk:

            working_hours = get_object_or_404(
                    Contacts.objects.prefetch_related('phone', 'email', 'address'), pk=pk
                )

            phone_serializer = PhoneSerializer(working_hours.phone.all(), many=True)
            email_serializer = EmailSerializer(working_hours.email.all(), many=True)
            address_serializer = AddressSerializer(working_hours.address.all(), many=True)
            working_hours_serializer = ContactsSerializer(working_hours)

            contacts = {
                'phones': phone_serializer.data,
                'emails': email_serializer.data,
                'addresses': address_serializer.data,
                'working_hours': working_hours_serializer.data
            }

            
            return Response(contacts, status=status.HTTP_200_OK)

        obj = Contacts.objects.all()
        
        obj = ContactsSerializer(obj, many=True)

        

        return Response(obj.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        return post_method(request, AddressSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Address, AddressSerializer, pk)

class GalleryView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Gallery, GallerySerializer, pk)
    
    def post(self, request):
        return post_method(request, GallerySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Gallery, GallerySerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Gallery, pk)

class SubCategoryView(APIView):
    def get(self, request, pk=None):
        return get_method(request, SubCategory, SubCategorySerializer, pk)
    
    def post(self, request):
        return post_method(request, SubCategorySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, SubCategory, SubCategorySerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(SubCategory, pk)


class CharacteristicView(APIView):
    def get(self, request, pk=None):
        return get_method(request, Characteristic, CharacteristicSerializer, pk)
    
    def post(self, request):
        return post_method(request, CharacteristicSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Characteristic, CharacteristicSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Characteristic, pk)

class ProductView(APIView):
    def get(self, request, pk=None):

        try:
            if pk:
                obj = get_object_or_404(Product, pk=pk)
                obj = ProductSerializer(obj)
                return Response(obj.data, status=status.HTTP_200_OK)
            
            sort_by = request.query_params.get('sort-by', '')
            min_price = request.query_params.get('min-price', '')
            max_price = request.query_params.get('max-price', '')
            characteristic_names = request.query_params.getlist('characteristic', '')
            category = request.query_params.get('category', '')
            admin = request.query_params.get('admin', '')
           
            if admin.lower() == 'true':
                if category:
                    products = Product.objects.filter(category__parent__name=category)
                else:
                    products = Product.objects.all()
            else:
                products = Product.objects.filter(category__is_show=True)

            
            if min_price and max_price:
                products = products.filter(price__gte=min_price, price__lte=max_price)

            if characteristic_names:
                for char in characteristic_names:
                    name, description = char.split(':')
                    products = products.filter(characteristic__name=name, characteristic__description=description)

            if sort_by.lower() == 'asc':
                products = products.order_by('price')

            elif sort_by.lower() == 'desc':
                products = products.order_by('-price')

            serializer = ProductSerializer(products, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
         
    
    def post(self, request):
        return post_method(request, ProductSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Product, ProductSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Product, pk)






