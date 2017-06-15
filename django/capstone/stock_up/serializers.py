from stock_up.models import KrogerProduct, Store, Category
from rest_framework import serializers


class KrogerProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = KrogerProduct
        fields = ('name', 'sale_price', 'store')
        # look into the store and category being foreign keys, may need to change what this serializer is inheriting


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('name', 'address', 'phone')


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = (['name'])
        # the fields need to be a list or a tuple, I got an error thrown without the [ ] around 'name'



