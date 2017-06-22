# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-06-22 18:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('sale_price', models.CharField(max_length=20)),
                ('store', models.CharField(max_length=75)),
            ],
        ),
    ]
