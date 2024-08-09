import time
from django.conf import settings
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Product
from .utils import upload_products
import os

@receiver(pre_save, sender=Product)
def update_product_images(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Product.objects.get(pk=instance.pk)
        for field in ['image', 'second_image', 'third_image']:
            old_image_field = getattr(old_instance, field)
            new_image_field = getattr(instance, field)

            if old_image_field and new_image_field: 
                instance._old_image_path = old_image_field.path
            
                old_image_name = os.path.basename(old_image_field.name)
                new_image_name = os.path.basename(new_image_field.name) 

                if any([old_instance.category != instance.category, \
                old_instance.name != instance.name, \
                old_image_name != new_image_name]):
                    
                    new_path = upload_products(instance, new_image_name)
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
            

    
                

                    
                    
                 
            
        
            
