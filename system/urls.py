from django.conf.urls import url
from . import views
from . import controller
from . import tester

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^pdfview$', views.pdfview, name='pdfview'),
    url(r'^watsonq$', views.watsonq, name='watsonrequest'),
    url(r'^testmyrequest$', tester.test, name='tester'),
    url(r'^testWebCrawler$', tester.webcrawler, name='webcrawler'),
    url(r'^stringEncryption$', tester.stringEncryption, name='stringEncryption'),
    url(r'^login$', tester.login, name = 'login'),
    url(r'^createAccount$', tester.createAccount, name = 'createAccount'),
    url(r'^logout$', tester.logout, name = 'logout'),
    url(r'^fileTest$', tester.fileTest, name = 'fileTest'),
    url(r'^fileTestGet$', tester.fileTestGet, name = 'fileTestGet'),
    url(r'^annotationTest$', tester.annotationTest, name = 'annotationTest'),
    url(r'^annotationTestGet$', tester.annotationTestGet, name = 'annotationTestGet'),
    url(r'^getDocument$', tester.getDocument, name = 'getDocument'),
    url(r'^saveDocumentName$', tester.saveDocumentName, name = 'saveDocumentName'),
    url(r'^saveDocument$', tester.saveDocument, name = 'saveDocument'),
    url(r'^saveAnnotatedDocument$', tester.saveAnnotatedDocument, name = 'saveAnnotatedDocument'),
    url(r'^getDocumentNameList$', tester.getDocumentNameList, name = 'getDocumentNameList'),
    url(r'^saveAnnotatedDocumentName$', tester.saveAnnotatedDocumentName, name = 'saveAnnotatedDocumentName'),
    url(r'^saveAnnotationAnnotations$', tester.saveAnnotationAnnotations, name = 'saveAnnotationAnnotations'),
    url(r'^saveAnnotatedDocument$', tester.saveAnnotatedDocument, name = 'saveAnnotatedDocument'),
    url(r'^logout$', tester.logout, name = 'logout'),
    url(r'^getAnnotations$', tester.getAnnotations, name = 'getAnnotations')
   # url(r'^getNotifications$', tester.getNotifications, name = 'getNotifications')
   # url(r'^removeAllNotifications$', tester.removeAllNotifications, name = 'removeAllNotifications')
  
]
