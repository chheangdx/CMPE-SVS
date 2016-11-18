from django.conf.urls import url
from . import views
from . import controller
from . import tester

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^watsonq$', tester.test, name='watsonrequest')
]