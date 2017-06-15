from stock_up.models import Store, Category, KrogerProduct
from rest_framework import viewsets
from stock_up.serializers import KrogerProductSerializer, StoreSerializer, CategorySerializer


class KrogerProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed.
    """
    queryset = KrogerProduct.objects.all().order_by('name')
    serializer_class = KrogerProductSerializer


class StoreViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows stores to be viewed.
    """
    queryset = Store.objects.all()
    serializer_class = StoreSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

