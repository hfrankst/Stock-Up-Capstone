from stock_up.models import Product
from rest_framework import serializers


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ('name', 'sale_price', 'store')
        # look into the store and category being foreign keys, may need to change what this serializer is inheriting
