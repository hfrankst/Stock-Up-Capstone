from django.db import models

# Create your models here.


class Product(models.Model):
    """
    Properties: to build the product table necessary to hold information about each product 
    Author: Harper Frankstone
    """

    name = models.Charfield(max_length=100)
    sale_price = models.IntegerField()
    sale_start = models.Charfield(max_length=50)
    sale_end = models.Charfield(max_length=50)
    store = models.ForeignKey(Store)
    category = models.ForeignKey(Category)


class Store(models.Model):
    """
    Properties: to build the store table in the database to hold relevant store information
    Author: Harper Frankstone
    """

    name = models.Charfield(max_length=50)
    address = models.Charfield(max_length=100)
    phone = models.Charfield(max_length=20)
    website = models.Charfield(max_length=100)


class Category(models.Model):
    """
    Properties: to build the category table in the database, only required to hold the name of the category
    Author: Harper Frankstone
    """

    name = models.Charfield(max_length=50)