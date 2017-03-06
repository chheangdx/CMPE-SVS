from django.conf.urls import url
from . import views
from . import controller
from . import tester

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^pdfview$', views.pdfview, name='pdfview'),
    url(r'^watsonq$', views.watsonq, name='watsonrequest'),
    url(r'^testmyrequest$', tester.test, name='tester'),
    url(r'^testWebCrawler$', tester.webcrawler, name='webcrawler')
]
