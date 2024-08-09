from django.conf import settings
from django.utils import timezone
from django.core.files.storage import default_storage
import os
import uuid

IMAGE_FIELDS = ['image', 'main_image', 'second_image', 'third_image']

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

def delete_image_field(instance, field_name=''):
    if hasattr(instance, '_old_image_path'):
        image_path = instance._old_image_path

        if os.path.exists(image_path):
            os.remove(image_path)

        image_dir = os.path.dirname(image_path)
        if not os.listdir(image_dir):
            os.rmdir(image_dir)

        category_dir = os.path.dirname(image_dir)
        if not os.listdir(category_dir):
            os.rmdir(category_dir)

    if hasattr(instance, field_name):
        image_field = getattr(instance, field_name)
        if image_field:
            image_path = image_field.path
            image_dir = os.path.dirname(image_path)
            if default_storage.exists(image_path):
                default_storage.delete(image_path)
                if not os.listdir(image_dir):
                    os.rmdir(image_dir)

def get_image_fields(instance, old_instance, field):
    old_image_field = getattr(old_instance, field)
    new_image_field = getattr(instance, field)
    return (old_image_field, new_image_field)

def get_image_names(old_image_field, new_image_field):
    old_image_name = os.path.basename(old_image_field.name)
    new_image_name = os.path.basename(new_image_field.name)
    return (old_image_name, new_image_name)

def check_products(instance, old_instance, old_image_field, new_image_field):
    old_image_name, new_image_name = get_image_names(old_image_field, new_image_field)
    return any([old_instance.category != instance.category, \
            old_instance.name != instance.name, \
            old_image_name != new_image_name])

def check_promo(instance, old_instance, old_image_field, new_image_field):
    old_image_name, new_image_name = get_image_names(old_image_field, new_image_field)
    return any([old_instance.name != instance.name, \
            old_image_name != new_image_name])

def check_pop_product(instance, old_instance, old_image_field, new_image_field):
    old_image_name, new_image_name = get_image_names(old_image_field, new_image_field)
    return any([old_instance.category != instance.category, \
            old_image_name != new_image_name])

def check_gallery(instance, old_instance, old_image_field, new_image_field):
    old_image_name, new_image_name = get_image_names(old_image_field, new_image_field)
    return any([old_instance.name != instance.name, \
            old_image_name != new_image_name])

def move_image_to_new_path(instance, model, check_fields, upload_path, field):
    
    if instance.pk:
        old_instance = model.objects.get(pk=instance.pk)
        old_image_field, new_image_field = get_image_fields(instance, old_instance, field)
        if old_image_field and new_image_field: 
            instance._old_image_path = old_image_field.path
        
            if check_fields(instance, old_instance, old_image_field, new_image_field):

                new_image_name = os.path.basename(new_image_field.name)
                new_path = upload_path(instance, new_image_name)
                new_full_path = os.path.join(settings.MEDIA_ROOT, new_path)
        
                if not os.path.exists(os.path.dirname(new_full_path)):
                    os.makedirs(os.path.dirname(new_full_path))                   
                
                try:
                    getattr(instance, field).save(
                        os.path.basename(new_full_path),
                        new_image_field.file, 
                        save=False
                    )
                finally:
                    if hasattr(new_image_field.file, 'close'):
                        new_image_field.file.close()
                        
                delete_image_field(instance)
