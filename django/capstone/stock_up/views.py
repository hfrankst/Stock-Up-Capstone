from stock_up.models import Store, Category, Product
from rest_framework import viewsets
from stock_up.serializers import ProductSerializer, StoreSerializer, CategorySerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed.
    """
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer


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

