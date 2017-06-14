from django.db import models



class Store(models.Model):
    """
    Properties: to build the store table in the database to hold relevant store information
    Author: Harper Frankstone
    """

    name = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
   


class Category(models.Model):
    """
    Properties: to build the category table in the database, only required to hold the name of the category
    Author: Harper Frankstone
    """

    name = models.CharField(max_length=50)



class KrogerProduct(models.Model):
    """
    Properties: to build the product table necessary to hold information about each product 
    Author: Harper Frankstone
    """

    name = models.CharField(max_length=100)
    sale_price = models.CharField(max_length=20)
    store = models.ForeignKey(Store)