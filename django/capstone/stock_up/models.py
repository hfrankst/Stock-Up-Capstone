from django.db import models


class Product(models.Model):
    """
    Properties: to build the product table necessary to hold information about each product 
    Author: Harper Frankstone
    """

    name = models.CharField(max_length=255)
    sale_price = models.CharField(max_length=20)
    store = models.CharField(max_length=35)