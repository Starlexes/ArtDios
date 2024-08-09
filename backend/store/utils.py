import time
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.files.storage import default_storage
from django.conf import settings

import os


def upload_products(instance, filename):
    return f'products/{instance.category}/{instance.name}/{filename}'

def upload_promo(instance, filename):
    return f'promotions/{instance.name}/{filename}'

def upload_gallery(instance, filename):
    return f'gallery/{instance.name}/{filename}'

def upload_pop_product(instance, filename):
    return f'popular-products/{instance.category}/{filename}'

def delete_image_field(instance, field_name):
    if hasattr(instance, field_name):
        image_field = getattr(instance, field_name)
        
        if image_field:
            image_path = instance._old_image_path
            image_dir = os.path.dirname(image_path)
        
                    
        if os.path.exists(image_path):
            os.remove(image_path)

        if not os.listdir(image_dir):
            os.rmdir(image_dir)

def move_image_to_new_path(instance, field_name, filename):
    if hasattr(instance, field_name):
        image_field = getattr(instance, field_name)
        old_path = image_field.path
        new_path = upload_products(instance, filename)
        new_full_path = os.path.join(settings.MEDIA_ROOT, new_path)
       
        if old_path != new_full_path:
            if not os.path.exists(os.path.dirname(new_full_path)):
                os.makedirs(os.path.dirname(new_full_path))
            if os.path.exists(old_path):
                os.rename(old_path, new_full_path)
            image_field.name = new_path
