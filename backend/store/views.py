from django.shortcuts import get_object_or_404 
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from django.contrib.auth import authenticate
from django.db.models import F, Q, Case, When, Value, CharField, Max, Min
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.db import transaction
from django.core.cache import cache

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken

from .models import *
from .serializers import *

def update_children_is_show(parent_instance):

    if isinstance(parent_instance, ProductType):
        categories = Category.objects.filter(parent=parent_instance)
        categories.update(is_show=parent_instance.is_show)
      
        for category in categories:
            SubCategory.objects.filter(parent=category).update(is_show=category.is_show)
   
    elif isinstance(parent_instance, Category):
        SubCategory.objects.filter(parent=parent_instance).update(is_show=parent_instance.is_show)

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
        data = request.data
        if isinstance(data, list):
            serializer = model_serializer(data=request.data, many=True)
        else:
            serializer = model_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
               
                return Response(serializer.data ,status=status.HTTP_200_OK)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        to_show = request.GET.get('to-show', '')
        if to_show:
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


class CategoryView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, Category, CategorySerializer, pk, slug)
    
    def post(self, request):
        return post_method(request, CategorySerializer)
    
    @transaction.atomic
    def put(self, request, pk=None):
        if pk is None:
            return put_method(request, Category, CategorySerializer, pk=pk)
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)

        if serializer.is_valid():
            category = serializer.save()
            update_children_is_show(category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk=None):
        return delete_method(Category, pk=pk)

class ProductTypeView(APIView):
    def get(self, request, pk=None, slug=None):
        return get_method(request, ProductType, ProductTypeSerializer, pk)
    
    def post(self, request):
        return post_method(request, ProductTypeSerializer)
    
    @transaction.atomic
    def put(self, request, pk=None):
        if pk is None:
            return put_method(request, ProductType, ProductTypeSerializer, pk=pk)
        
        product_type = get_object_or_404(ProductType, pk=pk)
        serializer = ProductTypeSerializer(product_type, data=request.data, partial=True)
        
        if serializer.is_valid():
   
            product_type = serializer.save()
            update_children_is_show(product_type)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            
        if pk or not isinstance(request.data, list):
                return put_method(request, Characteristic, CharacteristicSerializer, pk)
        
        try:
            data = request.data
            updated_items = []
            for item in data:
                item_id = item.get('char_id')
                char = Characteristic.objects.get(char_id=item_id)
                serializer = CharacteristicSerializer(char, data=item, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    updated_items.append(serializer.data)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
            return Response(updated_items, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

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
            category = request.query_params.getlist('category', '')
            admin = request.query_params.get('admin', '')
            search = request.query_params.get('search', '')


            products = Product.objects.all()

            if not admin:
                products = products.filter(category__is_show=True)
            
            if category:  
                if len(category) == 1:
                    obj = category[0]
                    products = products.filter(
                        Q(category__parent__slug=obj) | Q(category__slug=obj)
                    ).annotate(
                        category_name=Case(
                            When(category__parent__slug=obj, then='category__parent__name'),
                            When(category__slug=obj, then='category__name'),
                            default=Value(''),
                            output_field=CharField()
                        )
                    )
                
                elif len(category) > 1 and admin:
                    products = products.filter(category__parent__slug__in=category)
                
                        
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
                products = Product.objects.filter(
                    Q(name__icontains=search) |
                    Q(description__icontains=search) | 
                    Q(category__name__icontains=search) |
                    Q(category__parent__name__icontains=search) | 
                    Q(code=search)
                ).annotate(
                    search=search_vector,
                    rank=SearchRank(search_vector, SearchQuery(search))
                ).order_by('-rank')

            
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
    
    @transaction.atomic
    def delete(self, request, pk=None):
        if pk is not None:
            return delete_method(Product, pk)
        ids = request.data.get('ids', [])
        if (len(ids) > 0):
            products = Product.objects.filter(product_id__in=ids)
            for product in products:
                product.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


class ClassificationsView(APIView):
    def get(self, request):
        return get_method(request, Category, ClassificationsSerializer)


class SearchingSuggestionsView(APIView):
    def get(self, request):
        try:
            query = request.query_params.get('query', '')
            if query:
                category = Category.objects.filter(name__icontains=query, is_show=True)
                subcategory = SubCategory.objects.filter(name__icontains=query, is_show=True)
                
                cat_data = [{'name': cat.name, 'slug': cat.slug} for cat in category] if category else []
                subcat_data = [{'name': cat.name, 'slug': cat.slug} for cat in subcategory] if subcategory else []

                if cat_data and not subcat_data:            
                    return JsonResponse(cat_data, safe=False)
                if subcat_data and not cat_data:
                    return JsonResponse(subcat_data, safe=False)
                if subcat_data and cat_data:
                    suggestions = cat_data + subcat_data                  
                    return JsonResponse(suggestions, safe=False)
                if not cat_data and not subcat_data:
                    return JsonResponse([], safe=False)
            else:
                return Response([], status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid Credentials'}, status=400)