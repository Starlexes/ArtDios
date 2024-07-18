# Generated by Django 5.0.7 on 2024-07-18 11:57

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0004_alter_category_slug_alter_gallery_slug_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="category",
            name="slug",
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="subcategory",
            name="slug",
            field=models.SlugField(blank=True, max_length=255, null=True, unique=True),
        ),
    ]
