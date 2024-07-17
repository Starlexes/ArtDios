from django.db import models
from django.db.models import Index


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE)
    discount = models.IntegerField(null=True, blank=True)
    is_show = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.name
    class Meta:
        indexes = [
            Index(fields=['name']),
            Index(fields=['is_show']),
        ]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=300, unique=True, blank=False)
    description = models.TextField(blank=False)
    price = models.IntegerField(blank=False)
    new_price = models.IntegerField(null=True, blank=True)
    code = models.CharField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to=f'products/{category.name}/{name}/')
    characteristic = models.ForeignKey('Characteristic', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            Index(fields=['name']),
            Index(fields=['category']),
            Index(fields=['characteristic']),
        ]
        verbose_name = "Product"
        verbose_name_plural = "Products"
class Characteristic(models.Model):
    char_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return f'Название: {self.name}\n Описание: {self.description}'
    
    class Meta:
        verbose_name = "Characteristic"
        verbose_name_plural = "Characteristics"

class Promotion(models.Model):
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=False)
    is_show = models.BooleanField(default=False, blank=False)
    main_image = models.ImageField(upload_to=f'promotions/{name}/main-image/')
    second_image = models.ImageField(upload_to=f'promotions/{name}/second-image/')

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"

class PopularProduct(models.Model):
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=f'popular-products/{category.name}/')
    is_show = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return self.category.name

    class Meta:
        verbose_name = "PopularProduct"
        verbose_name_plural = "PopularProducts"

class Gallery(models.Model):
    gallery_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=False)
    image = models.ImageField(upload_to=f'gallery/{name}/')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Gallery"
        verbose_name_plural = "Gallery"
class Contacts(models.Model):
    opening_hours = models.TimeField()
    closing_hours = models.TimeField()

    class Meta:
        verbose_name = "Contacts"
        verbose_name_plural = "Contacts"


class Phone(models.Model):
    contacts = models.ForeignKey(Contacts, on_delete=models.DO_NOTHING) 
    number = models.CharField(max_length=25, blank=False, unique=True)

    class Meta:
        verbose_name = "Phone"
        verbose_name_plural = "Phones"

class Email(models.Model):
    contacts = models.ForeignKey(Contacts, on_delete=models.DO_NOTHING)
    email = models.EmailField(unique=True, max_length=255, blank=False)

    class Meta:
        verbose_name = "Email"
        verbose_name_plural = "Emails"

class Address(models.Model):
    contacts = models.ForeignKey(Contacts, on_delete=models.DO_NOTHING)
    address = models.CharField(max_length=255, blank=False)

    class Meta:
        verbose_name = "Address"
        verbose_name_plural = "Address"