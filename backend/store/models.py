from django.db import models
from django.db.models import Index
import slugify
from transliterate import translit


def upload_products(instance, filename):
    return f'products/{instance.category}/{instance.name}/{filename}'

def upload_promo(instance, filename):
    return f'promotions/{instance.name}/{filename}'

def upload_gallery(instance, filename):
    return f'gallery/{instance.name}/{filename}'

def upload_pop_product(instance, filename):
    return f'popular-products/{instance.category}/{filename}'

# Create your models here.
class ProductType(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    is_show = models.BooleanField(default=True, blank=False)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "ProductType"
        verbose_name_plural = "ProductTypes"

class Category(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, null=True, blank=True)
    parent = models.ForeignKey(ProductType, null=True, blank=True, on_delete=models.CASCADE)
    is_show = models.BooleanField(default=True, blank=False)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify.slugify(translit(self.name, 'ru', reversed=True))
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    class Meta:
        indexes = [
            Index(fields=['name']),
            Index(fields=['is_show']),
        ]
        verbose_name = "Category"
        verbose_name_plural = "Categories"

class SubCategory(models.Model):
    name = models.CharField(max_length=255, blank=False, unique=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, null=True, blank=True)
    parent = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)
    is_show = models.BooleanField(default=True, blank=False)
    discount = models.IntegerField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify.slugify(translit(self.name, 'ru', reversed=True))
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    class Meta:
        indexes = [
            Index(fields=['name']),
            Index(fields=['is_show']),
        ]

        verbose_name = "SubCategory"
        verbose_name_plural = "SubCategories"



class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    slug = models.SlugField(max_length=300, unique=True, db_index=True, null=True, blank=True)
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=300, unique=True)
    description = models.TextField()
    price = models.IntegerField()
    new_price = models.IntegerField(null=True, blank=True)
    code = models.CharField(max_length=255, null=True)
    image = models.ImageField(upload_to=upload_products)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify.slugify(translit(self.name, 'ru', reversed=True))
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        indexes = [
            Index(fields=['name']),
            Index(fields=['category']),
        ]
        verbose_name = "Product"
        verbose_name_plural = "Products"
        
class Characteristic(models.Model):
    char_id = models.AutoField(primary_key=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=False)
    name = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=False)

    def __str__(self):
        return f'Название: {self.name}\n Описание: {self.description}'
    
    class Meta:
        verbose_name = "Characteristic"
        verbose_name_plural = "Characteristics"

class Promotion(models.Model):
    name = models.CharField(max_length=255, blank=False)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, null=True, blank=True)
    description = models.TextField(blank=False)
    is_show = models.BooleanField(default=False, blank=False)
    main_image = models.ImageField(upload_to=upload_promo)
    second_image = models.ImageField(upload_to=upload_promo)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify.slugify(translit(self.name, 'ru', reversed=True))
        super(Promotion, self).save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"

class PopularProduct(models.Model):
    
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=upload_pop_product)
    is_show = models.BooleanField(default=False, blank=False)

    def __str__(self):
        return self.category.name

    class Meta:
        verbose_name = "PopularProduct"
        verbose_name_plural = "PopularProducts"

class Gallery(models.Model):
    gallery_id = models.AutoField(primary_key=True)
    slug = models.SlugField(max_length=255, unique=True, db_index=True, null=True, blank=True)
    name = models.CharField(max_length=255, blank=False)
    description = models.TextField(blank=False)
    image = models.ImageField(upload_to=upload_gallery)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify.slugify(translit(self.name, 'ru', reversed=True))
        super(Gallery, self).save(*args, **kwargs)

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