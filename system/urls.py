from django.conf.urls import url
from . import views
from . import controller
from . import tester

urlpatterns = [
    url(r'^index$', views.index, name='index'),
    url(r'^testmyrequest$', tester.test, name='testrequest')
]
