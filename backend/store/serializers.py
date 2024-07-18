from rest_framework import serializers
from .models import Category, ProductType

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        exclude = ['slug']

