import time
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.files.storage import default_storage
from django.conf import settings
from django.utils import timezone
import os
import uuid

def get_unique_name(filename):
    base, extension = os.path.splitext(filename)
    base = base.split('_')[0]
    unique_id = uuid.uuid4().hex
    timestamp = timezone.now().strftime('%Y%m%d')
    return (base, extension, timestamp, unique_id)

def upload_products(instance, filename):
    base, extension, timestamp, unique_id = get_unique_name(filename)
    return f'products/{instance.category}/{instance.name}/{base}_{timestamp}_{unique_id[:6]}{extension}'

def upload_promo(instance, filename):
    base, extension, timestamp, unique_id = get_unique_name(filename)
    return f'promotions/{instance.name}/{base}_{timestamp}_{unique_id[:6]}{extension}'

def upload_gallery(instance, filename):
    base, extension, timestamp, unique_id = get_unique_name(filename)
    return f'gallery/{instance.name}/{base}_{timestamp}_{unique_id[:6]}{extension}'

def upload_pop_product(instance, filename):
    base, extension, timestamp, unique_id = get_unique_name(filename)
    return f'popular-products/{instance.category}/{base}_{timestamp}_{unique_id[:6]}{extension}'

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
