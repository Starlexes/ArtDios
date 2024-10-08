from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_show']
    search_fields = ['name']
    list_filter = ['name']
    ordering = ['name']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'is_show', 'slug']
    search_fields = ['name', 'parent']
    list_filter = ['name']
    ordering = ['name']

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'is_show', 'discount', 'slug']
    search_fields = ['name', 'parent']
    list_filter = ['name']
    ordering = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'category', 'name', 'description', 'price', 'new_price', 'code', 'image', 'slug']
    search_fields = ['name', 'code']
    list_filter = ['name']
    ordering = ['name']

@admin.register(Characteristic)
class CharacteristicAdmin(admin.ModelAdmin):
    list_display = ['char_id', 'name', 'description']
    search_fields = ['name']
    list_filter = ['name']
    ordering = ['name']

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in Promotion._meta.get_fields()]
    search_fields = ['name']
    list_filter = ['name']
    ordering = ['name']

@admin.register(PopularProduct)
class PopularProductAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in PopularProduct._meta.get_fields()]
    search_fields = ['category']
    list_filter = ['category']
    ordering = ['category']

@admin.register(Gallery)
class GalleryAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in Gallery._meta.get_fields()]
    search_fields = ['name']
    list_filter = ['name']
    ordering = ['name']

@admin.register(WorkingHours)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ['opening_hours', 'closing_hours']
    
@admin.register(Phone)
class PhoneAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in Phone._meta.get_fields()]
    
@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in Email._meta.get_fields()]
    
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    def get_list_display(self, request):
        return [field.name for field in Address._meta.get_fields()]
