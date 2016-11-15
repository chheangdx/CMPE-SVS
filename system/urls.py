from django.conf.urls import url
from . import views
from . import controller
from . import tester

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^tester$', tester.index, name='tester'),
    url(r'^testmyrequest$', tester.test, name='testrequest'),
]
