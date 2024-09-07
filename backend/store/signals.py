from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Gallery, PopularProduct, Product, Promotion, SubCategory
from .utils import check_products, check_promo, \
                    check_pop_product, check_gallery,\
                    move_image_to_new_path, upload_products, \
                    upload_promo, upload_gallery, upload_pop_product


@receiver(pre_save, sender=Product)
def update_product_images(sender, instance, **kwargs):
    image_fields = ['image', 'second_image', 'third_image']
    for field in image_fields:
        move_image_to_new_path(instance, Product, check_products, upload_products, field)


@receiver(pre_save, sender=Promotion)
def update_promotion_images(sender, instance, **kwargs):
    image_fields = ['main_image', 'second_image']
    for field in image_fields:
        move_image_to_new_path(instance, Promotion, check_promo, upload_promo, field)         

@receiver(pre_save, sender=PopularProduct)
def update_pop_product_images(sender, instance, **kwargs):
    field = 'image'  
    move_image_to_new_path(instance, PopularProduct, check_pop_product, upload_pop_product, field)  


@receiver(pre_save, sender=Gallery)
def update_gallery_images(sender, instance, **kwargs):
    field = 'image'  
    move_image_to_new_path(instance, Gallery, check_gallery, upload_gallery, field)   

@receiver(post_save, sender=SubCategory)
def update_product_new_price(sender, instance, **kwargs):
    products = instance.product.all()
    discount_percentage = instance.discount
    for product in products:
        if discount_percentage is not None and discount_percentage > 0:
            product.new_price = round(product.price * (1 - discount_percentage / 100))
        else:
            product.new_price = None
        product.save()

@receiver(post_save, sender=Product)
def update_product_pricing(sender, instance, **kwargs):
    if instance.category and instance.category.discount is not None and instance.category.discount > 0:
        discount_percentage = instance.category.discount
        new_price = round(instance.price * (1 - discount_percentage / 100))
    else: 
        new_price = None

    if instance.new_price != new_price:
        instance.new_price = new_price
        instance.save()