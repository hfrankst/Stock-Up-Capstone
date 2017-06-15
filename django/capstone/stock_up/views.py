from stock_up.models import Product
from rest_framework import viewsets
from stock_up.serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows products to be viewed.
    """
    queryset = Product.objects.all().order_by('name')
    serializer_class = ProductSerializer


