from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import Gallery, PopularProduct, Product, Promotion
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