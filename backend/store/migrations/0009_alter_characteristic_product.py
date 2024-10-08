# Generated by Django 5.0.7 on 2024-07-20 10:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("store", "0008_product_second_image_product_third_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="characteristic",
            name="product",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="characteristic",
                to="store.product",
            ),
        ),
    ]
