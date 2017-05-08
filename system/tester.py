from django.http import HttpResponse
from django.template import loader
from django.contrib.staticfiles.templatetags.staticfiles import static
import json
import ast
import pymongo
from pymongo import MongoClient
import gridfs

#web crawler imports
import urllib

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.accounts.service import MongoService
from .com.cmpe.svs.utility import SVSEncryptionFactory, SVSSessionFactory 
from .com.cmpe.svs.assisitivedoc import ADPService

count = 0
myFile = 0


def connectToMongoDB(databaseName):
    print("Connecting to MongoDB...documents")
    client = MongoClient('aws-us-east-1-portal.17.dblayer.com', 15319)
    if not client:
        print("MongoDB Error: Could not connect to DB.")
    db = client[databaseName]
    db.authenticate('cann', 'cannpassword', mechanism = 'SCRAM-SHA-1')
    if not(db):
    	print("error")
    return db



   
    
def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	global count
	#if body = {message: "hello"}, then you access like body["message"]
	print ("******"+ str(count) + "******")
	count = count + 1
	print (body)
	#TODO: Test stuff here 
	response = {"message": "hello", "name": "dude"} #WHAT YOU ARE RETURNING 
	
	#epilog 
	return HttpResponse(json.dumps(response))


def webcrawler(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	#body 
	thisurl = body["data"]
	#response = crawlerController.simpleCrawl(thisurl)
	#response = crawlerController.parseText(thisurl)
	response = crawlerController.crawl(thisurl)
	
	#epilog 
	return HttpResponse(response)





def login(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("login", data, httprequest);

	print("Returning data for login command:")
	print(response)

	return HttpResponse(json.dumps(response))

def getCategory(request):
	httprequest = request
	response = MongoService.service("getCategory", "", httprequest);

	print("Returning data for getCategory command:")
	print(response)

	return HttpResponse(json.dumps(response))

def addCategory(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("addCategory", data, httprequest);

	print("Returning data for getCategory command:")
	print(response)

	return HttpResponse(json.dumps(response))

def deleteCategory(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("deleteCategory", data, httprequest);

	print("Returning data for deleteCategory command:")
	print(response)

	return HttpResponse(json.dumps(response))

def saveAnnotatedDocumentName(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	print("SAVE ANNOTATED DOCUMENT NAME REQUEST: ")
	print(data)
	response = ADPService.service("saveAnnotatedDocumentName", data, httprequest)
	print("Returning data for saveAnnotatedDocumentName command:")
	print(response)
	return HttpResponse(json.dumps(response))

def saveAnnotationAnnotations(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	print("SAVE ANNOTATED ANNOTATIONS REQUEST SENT TO BACKEND: ")
	print(data)
	response = ADPService.service("saveAnnotationAnnotations", data, httprequest)
	print("Returning data for saveAnnotationAnnotations command:")
	print(response)
	return HttpResponse(json.dumps(response))

def saveAnnotatedDocument(request):
	httprequest  = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = ADPService.service("saveAnnotatedDocument", data, httprequest)
	print("Returning data for saveAnnotatedDocumentcommand:")
	print(response)
	return HttpResponse(json.dumps(response))

	

def getDocumentNameList(request):
	httprequest = request
	response = ADPService.service("getDocumentNameList", " ",  httprequest)
	print("Returning data for getDocumentName List:")
	print(response)
	return HttpResponse(json.dumps(response))

def getDocument(request):
	httprequest = request
	response = ADPService.service("getDocument", "", httprequest)
	print("Returning data for getDocument command:")

	return HttpResponse(response)

def deleteDocument(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = ADPService.service("deleteDocument", data, httprequest)
	print("Returning data for deleteDocument command:")
	print(response)
	return HttpResponse(json.dumps(response))


def getAnnotatedDocument(request):
	httprequest = request
	response = ADPService.service("getAnnotatedDocument", "", httprequest)
	print("Returning data for getAnnotatedDocument command:")

	return HttpResponse(response)

def getAnnotations(request):
	httprequest = request
	response = ADPService.service("getAnnotations", "", httprequest)
	print("Returning data for getAnnotation command:")
	print(response)
	return HttpResponse(json.dumps(response))

def saveDocument(request):
	httprequest  = request
	myFile = request.body
	response = ADPService.service("saveDocument", myFile, httprequest)
	print("Returning data for saveDocument command:")
	print(response)
	return HttpResponse(json.dumps(response))


def saveDocumentName(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	print("SAVE DOCUMENT NAME REQUEST: ")
	print(data)
	response = ADPService.service("saveDocumentName", data, httprequest)
	print("Returning data for saveDocumentName command:")
	print(response)
	return HttpResponse(json.dumps(response))

def createAccount(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("createAccount", data, httprequest);
	print(response)
	return HttpResponse(json.dumps(response))

def logout(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("logout", data, httprequest);
	print(response)
	return HttpResponse(json.dumps(response))
	
	
	
def fileTest(request):
	databaseName = 'TestDB'
	db = connectToMongoDB(databaseName)
	fs = gridfs.GridFS(db)


	global myFile
	myFile = request.body
	testfile = fs.put(myFile, filename = "pdf21", username = "kickthecann3")
	out = fs.get(testfile)



	print("bloop")
	print(out)
	#uploadDocument(db, myFile)


	return (HttpResponse(request.body))

def fileTestGet(request):
	databaseName = 'TestDB'
	db = connectToMongoDB(databaseName)
	fs = gridfs.GridFS(db)

	for grid_data in fs.find({"username":"kickthecann3","filename": "pdf21"}, no_cursor_timeout=True):
    		data = grid_data.read()

 

	return (HttpResponse(data))


#web crawler imports
import urllib

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.utility import SVSEncryptionFactory, SVSSessionFactory

#secret key cryptography
from simplecrypt import encrypt, decrypt
from binascii import hexlify, unhexlify

count = 0
myFile = 0
myAnnotations = []

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	global count
	#if body = {message: "hello"}, then you access like body["message"]
	print ("******"+ str(count) + "******")
	count = count + 1
	print (body)
	#TODO: Test stuff here 
	response = {"message": "hello", "name": "dude"} #WHAT YOU ARE RETURNING 
	
	#epilog 
	return HttpResponse(json.dumps(response))


def webcrawler(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	#body 
	thisurl = body["data"]
	response = crawlerController.simpleCrawl(thisurl)
	#response = crawlerController.parseText(thisurl)
	#response = crawlerController.crawl(thisurl)
	
	#epilog 
	return HttpResponse(response)


	
def fileTest(request):
	#prolog
	databaseName = 'TestDB'
 
	db = connectToMongoDB(databaseName)
 
	fs = gridfs.GridFS(db)
 
	#body
	global myFile
	myFile = request.body
	myFile = SVSEncryptionFactory.svsSign(myFile, "pdf", True)
	myFile = SVSEncryptionFactory.svsEncrypt(myFile, "key")
	myFile = SVSEncryptionFactory.svsSign(myFile, "calcium chloride", True)
 
	testfile = fs.put(myFile, filename = "pdf321", username = "kickthecann3")
 
	out = fs.get(testfile)

	#epilog
	return (HttpResponse(request.body))

def fileTestGet(request):
	#prolog
	
	#body 
	databaseName = 'TestDB'
 
	db = connectToMongoDB(databaseName)
 
	fs = gridfs.GridFS(db)
 

	for grid_data in fs.find({"username":"kickthecann3","filename": "pdf321"}, no_cursor_timeout=True):
		data = grid_data.read()
 
	toReturn = SVSEncryptionFactory.svsUnsign(data, "calcium chloride", True)
	toReturn = SVSEncryptionFactory.svsDecrypt(toReturn, "key", True)
	toReturn = SVSEncryptionFactory.svsUnsign(toReturn, "pdf", True)
	#epilog
	return (HttpResponse(toReturn))

def annotationTest(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	
	#body
	global myAnnotations
	myAnnotations = body['annotations']
	if(len(myAnnotations) > 0):
		plaintext = myAnnotations[0]['text']
		ciphertext = encrypt('password', plaintext)
		myAnnotations[0]['text'] = ciphertext
		print(plaintext)
		
	#epilog
	return (HttpResponse(request.body))
	
def annotationTestGet(request):
	
	return (HttpResponse(json.dumps(myAnnotations)))
	
def stringEncryption(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	
	#body 
	
	
	inputString = body["data"]
	layer1 = SVSEncryptionFactory.svsSign(inputString, "test", False)
	layer2 = SVSEncryptionFactory.svsEncrypt(layer1, "test")
	layer3 = SVSEncryptionFactory.svsSign(layer2, "salt", True)
	layer3_2 = SVSEncryptionFactory.svsUnsign(layer3, "salt", True)
	layer2_2 = SVSEncryptionFactory.svsDecrypt(layer3_2, "test", True)
	layer1_2 = SVSEncryptionFactory.svsUnsign(layer2_2, "test", False)
	
	#test sessions
	SVSSessionFactory.setInSession(request, "testKey", layer1_2)
	data = SVSSessionFactory.getFromSession(request, "testKey")

	
	response = {"message": data}
	
	
	#epilog 
	return HttpResponse(response)