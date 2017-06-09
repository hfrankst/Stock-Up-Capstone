from django.contrib.auth.models import Product, Store, Category
from rest_framework import serializers


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'sale price', 'sale start', 'sale end', 'store', 'category')
        # look into the store and category being foreign keys, may need to change what this serializer is inheriting


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('name', 'address', 'phone', 'url')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('name')



