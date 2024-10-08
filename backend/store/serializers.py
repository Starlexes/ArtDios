from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'parent', 'is_show']
        
class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['id', 'name', 'is_show']

class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'slug', 'parent', 'is_show', 'discount']

class ClassificationsSerializer(serializers.ModelSerializer):
    subcategory = SubCategorySerializer(many=True)
    class Meta:
        model = Category
        fields = '__all__'
        

class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    characteristics = CharacteristicSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['product_id', 'slug', 'category', 'name',
                  'description', 'price', 'new_price', 'code', 
                  'image', 'second_image', 'third_image', 'characteristics']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if hasattr(instance, 'category_name'):
            representation['category_name'] = instance.category_name
        if hasattr(instance, 'sort_order'):
            representation['sort_order'] = instance.sort_order 
        return representation



class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = '__all__'

class PopularProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopularProduct
        fields = '__all__'
    
class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Gallery
        fields = '__all__'


class WorkingHoursSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkingHours
        fields = '__all__'

class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)