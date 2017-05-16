from django.conf.urls import url
from . import views
from . import controller
from . import tester
from . import userAccounts
from . import adminCommands
from . import assistiveDocumentPreparation
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^pdfview$', views.pdfview, name='pdfview'),
    url(r'^watsonq$', views.watsonq, name='watsonrequest'),
    url(r'^testmyrequest$', tester.test, name='tester'),
    url(r'^testWebCrawler$', tester.webcrawler, name='webcrawler'),
    url(r'^stringEncryption$', tester.stringEncryption, name='stringEncryption'),
  
    url(r'^fileTest$', tester.fileTest, name = 'fileTest'),
    url(r'^fileTestGet$', tester.fileTestGet, name = 'fileTestGet'),
    url(r'^annotationTest$', tester.annotationTest, name = 'annotationTest'),
    url(r'^annotationTestGet$', tester.annotationTestGet, name = 'annotationTestGet'),



  ####################### ADMIN COMMANDS URL #######################
    url(r'^addCategory$', adminCommands.addCategory, name = "addCategory"),
    url(r'^deleteCategory$', adminCommands.deleteCategory, name = "deleteCategory"),
    url(r'^getCategory$', adminCommands.getCategory, name = "getCategory"),
    url(r'^adminGetDocumentList$', adminCommands.adminGetDocumentList, name = "adminGetDocumentList"),
    url(r'^saveAnnotatedDocument$', adminCommands.saveAnnotatedDocument, name = 'saveAnnotatedDocument'),

    url(r'^adminGetDocument$', adminCommands.adminGetDocument, name = 'adminGetDocument'),
    url(r'^adminSaveDocumentName$', adminCommands.adminSaveDocumentName, name = 'adminSaveDocumentName'),
    url(r'^adminGetAnnotations$', adminCommands.adminGetAnnotations, name = 'adminGetAnnotations'),
    url(r'^adminGetAnnotatedDocument$', adminCommands.adminGetAnnotatedDocument, name = 'adminGetAnnotations'),
    url(r'^adminSaveAnnotatedDocumentName$', adminCommands.adminSaveAnnotatedDocumentName, name = "adminSaveAnnotatedDocumentName"),

  ####################### ACCOUNTS URL #########################
    url(r'^loginUser$', userAccounts.login, name = 'login'),
    url(r'^createAccount$', userAccounts.createAccount, name = 'createAccount'),
    url(r'^logout$', userAccounts.logout, name = 'logout'),
    url(r'^whoAmI$', userAccounts.whoAmI, name = 'whoAmI'),
    url(r'^editAccountInformation$', userAccounts.editAccountInformation, name = 'editAccountInformation'),
    url(r'^getAccountInformation$', userAccounts.getAccountInformation, name = 'getAccountInformation'),
  ######################## ADP URL ##############################
    url(r'saveAnnotatedDocumentName$', assistiveDocumentPreparation.saveAnnotatedDocumentName, name = "saveAnnotatedDocumentName"),
    url(r'^saveDocumentName$', assistiveDocumentPreparation.saveDocumentName, name = 'saveDocumentName'),
    url(r'^saveDocument$', assistiveDocumentPreparation.saveDocument, name = 'saveDocument'),
    url(r'^getDocument$', assistiveDocumentPreparation.getDocument, name = 'getDocument'),
    url(r'^getDocumentNameList$', assistiveDocumentPreparation.getDocumentNameList, name = 'getDocumentNameList'),
    url(r'^getAnnotations$', assistiveDocumentPreparation.getAnnotations, name = 'getAnnotations'),
    url(r'^getAnnotatedDocument$', assistiveDocumentPreparation.getAnnotatedDocument, name = 'getAnnotatedDocument'),
    url(r'^deleteDocument$', assistiveDocumentPreparation.deleteDocument, name = "deleteDocument")
]
