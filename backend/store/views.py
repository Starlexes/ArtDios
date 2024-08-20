from django.shortcuts import render, get_object_or_404 
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.db.models import F, Q, Case, When, Value, CharField, Max, Min, Count
from django.http import JsonResponse
from django.middleware.csrf import get_token

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from .models import *
from .serializers import *


def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

def get_method(request, model, model_serializer, pk=None, slug=None):
    try:
        if pk or slug:
            if hasattr(model, 'slug') and slug:
                obj = get_object_or_404(model, slug=slug)
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
    def get(self, request, pk=None, slug=None):
        return get_method(request, Category, CategorySerializer, pk, slug)
    
    def post(self, request):
        return post_method(request, CategorySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Category, CategorySerializer, pk=pk)

    def delete(self, request, pk=None):
        return delete_method(Category, pk=pk)

class ProductTypeView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, ProductType, ProductTypeSerializer, pk)
    
    def post(self, request):
        return post_method(request, ProductTypeSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, ProductType, ProductTypeSerializer, pk=pk)

    def delete(self, request, pk=None):
        return delete_method(ProductType, pk=pk)

class PopularProductView(APIView):

    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None, slug=None):
        return get_method(request, PopularProduct, PopularProductSerializer, pk)
    
    def post(self, request):
        return post_method(request, PopularProductSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, PopularProduct, PopularProductSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(PopularProduct, pk)
    
class PromotionView(APIView):
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get(self, request, pk=None, slug=None):
        return get_method(request, Promotion, PromotionSerializer, pk, slug)
    
    def post(self, request):
        return post_method(request, PromotionSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Promotion, PromotionSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Promotion, pk)
    
class PhoneView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, Phone, PhoneSerializer, pk)
    
    def post(self, request):
        return post_method(request, PhoneSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Phone, PhoneSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Phone, pk)
    
class EmailView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, Email, EmailSerializer, pk)
    
    def post(self, request):
        return post_method(request, EmailSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Email, EmailSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Email, pk)
    
class AddressView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, Address, AddressSerializer, pk)
    
    def post(self, request):
        return post_method(request, AddressSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Address, AddressSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Address, pk)


class WorkingHoursView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, WorkingHours, WorkingHoursSerializer, pk)
    
    def post(self, request):
        return post_method(request, WorkingHoursSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, WorkingHours, WorkingHoursSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(WorkingHours, pk)

class ContactsView(APIView):
    def get(self, request):
        
        working_hours = WorkingHoursSerializer(WorkingHours.objects.values("opening_hours", "closing_hours"), many=True)
        phone_serializer = PhoneSerializer(Phone.objects.values("number"), many=True)
        email_serializer = EmailSerializer(Email.objects.values("email"), many=True)
        address_serializer = AddressSerializer(Address.objects.values("address"), many=True)

        contacts = {
            'phones': phone_serializer.data,
            'emails': email_serializer.data,
            'addresses': address_serializer.data,
            'working_hours': working_hours.data
        }

        return Response(contacts, status=status.HTTP_200_OK)


class GalleryView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, Gallery, GallerySerializer, pk)
    
    def post(self, request):
        return post_method(request, GallerySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Gallery, GallerySerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Gallery, pk)

class SubCategoryView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, SubCategory, SubCategorySerializer, pk)
    
    def post(self, request):
        return post_method(request, SubCategorySerializer)
    
    def put(self, request, pk=None):
        return put_method(request, SubCategory, SubCategorySerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(SubCategory, pk)


class CharacteristicView(APIView):
    def get(self, request, pk=None, slug=None):
        if pk:
            return get_method(request, Characteristic, CharacteristicSerializer, pk)
        try:
            product = request.query_params.get('product', '')
            category = request.query_params.get('category', '')

    
            chars = Characteristic.objects.all()

            if category:  
                chars = chars.filter(
                    Q(product__category__parent__slug=category) | Q(product__category__slug=category)
                )
            
            if product:
                chars = chars.filter(product__slug=product)
 
            serializer = CharacteristicSerializer(chars, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
        
    
    def post(self, request):
        return post_method(request, CharacteristicSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Characteristic, CharacteristicSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Characteristic, pk)

class ProductView(APIView):
    def get(self, request, pk=None, slug=None):

        try:
            if pk or slug:
                if slug:
                    obj = get_object_or_404(Product, slug=slug)
                    chars = Characteristic.objects.filter(product__slug=slug)
                if pk:
                    obj = get_object_or_404(Product, slug=slug)
                    chars = Characteristic.objects.filter(product__pk=pk)
                
                chars_obj = CharacteristicSerializer(chars, many=True)
                product_data = ProductSerializer(obj).data
                data = {
                    **product_data,
                    'characteristics': chars_obj.data
                }
                return Response(data, status=status.HTTP_200_OK)
                            
            sort_by = request.query_params.get('sort-by', '')
            min_price = request.query_params.get('min-price', '')
            max_price = request.query_params.get('max-price', '')
            characteristic_names = request.query_params.getlist('characteristic', '')
            category = request.query_params.get('category', '')
            admin = request.query_params.get('admin', '')
            search = request.query_params.get('search', '')
    
            products = Product.objects.all()

            if not admin:
                products = products.filter(category__is_show=True)

            if category:  
                products = products.filter(
                    Q(category__parent__slug=category) | Q(category__slug=category)
                ).annotate(
                    category_name=Case(
                        When(category__parent__slug=category, then='category__parent__name'),
                        When(category__slug=category, then='category__name'),
                        default=Value(''),
                        output_field=CharField()
                    )
                )
            aggregated_data = products.aggregate(
                max_category_price=Max(
                    Case(
                        When(new_price__isnull=False, then='new_price'),
                        When(new_price__isnull=True, then='price'),
                        output_field=models.IntegerField()
                    )
                ),
                min_category_price=Min(
                    Case(
                        When(new_price__isnull=False, then='new_price'),
                        When(new_price__isnull=True, then='price'),
                        output_field=models.IntegerField()
                    )
                )
            )
            
            if search:
                search_vector = SearchVector('name', 'description', 'code') + \
                        SearchVector(F('category__name')) + \
                        SearchVector(F('category__parent__name'))
                search_query = SearchQuery(search)
                products = Product.objects.annotate(search=search_vector, rank=SearchRank(search_vector, search_query)
                            ).filter(search=search_query).order_by("-rank")
                
            
            if min_price and max_price:
                products = products.filter( 
                Q(new_price__gte=min_price, new_price__lte=max_price) | 
                Q(new_price__isnull=True, price__gte=min_price, price__lte=max_price)
                )

            if characteristic_names:
               
                characteristic_filters = {}
                for item in characteristic_names:
                    key, value = item.split(':')
                    if key not in characteristic_filters:
                        characteristic_filters[key] = []
                    characteristic_filters[key].append(value)

                for key, values in characteristic_filters.items():
                  
                    products = products.filter(
                        characteristic__name=key,
                        characteristic__description__in=values
                    )
                
                products = products.distinct()

            if sort_by.lower() == 'asc':
                products = products.annotate(
                    sort_order=Case(
                        When(new_price__isnull=True, then='price'),
                        When(new_price__isnull=False, then='new_price'),
                        default=Value(None)
                    )
                ).order_by('sort_order')
         

            elif sort_by.lower() == 'desc':
                products = products.annotate(
                    sort_order=Case(
                        When(new_price__isnull=True, then='price'),
                        When(new_price__isnull=False, then='new_price'),
                        default=Value(None)
                    )
                ).order_by('-sort_order')

            serializer = ProductSerializer(products, many=True)

            data = {
                'products': serializer.data,
                'minPrice': aggregated_data['min_category_price'],
                'maxPrice': aggregated_data['max_category_price']
            }

            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
         
    
    def post(self, request):
        return post_method(request, ProductSerializer)
    
    def put(self, request, pk=None):
        return put_method(request, Product, ProductSerializer, pk)

    def delete(self, request, pk=None):
        return delete_method(Product, pk)


class ClassificationsView(APIView):
    def get(self, request):
        return get_method(request, Category, ClassificationsSerializer)



