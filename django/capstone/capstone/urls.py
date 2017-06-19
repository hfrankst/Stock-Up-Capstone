"""capstone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from rest_framework import routers
from stock_up import views  
from django.contrib import admin


router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)



urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),
    # https://thinkster.io/django-angularjs-tutorial    --this tutorial said that the below url route needs to be the last one, it's a catch-all url that feeds everything to the angular client
    # got an error thrown because the IndexView isn't defined anywhere
    # url('^.*$', IndexView.as_view(), name='index')
]
