from django.http import HttpResponse
from django.template import loader
from django.contrib.staticfiles.templatetags.staticfiles import static
import json
import ast

#web crawler imports
import urllib

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.accounts.controllers import AccountsController	# account controller
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

def login(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)

	response = AccountsController.controller("login", data);
	print("Returning data:")
	print(response)


	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 
	return HttpResponse(json.dumps(response))


def createAccount(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)

	response = AccountsController.controller("createAccount", data);
	print(response)
	return HttpResponse(json.dumps(response))

def logout(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = AccountsController.controller("logout", data);
	print(response)
	return HttpResponse(json.dumps(response))

	
   	
   	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 
	return HttpResponse(json.dumps(response))
	
	
def fileTest(request):
	#prolog
	
	#body
	global myFile
	myFile = request.body
	myFile = SVSEncryptionFactory.svsSign(myFile, "pdf", True)
	myFile = SVSEncryptionFactory.svsEncrypt(myFile, "key")
	myFile = SVSEncryptionFactory.svsSign(myFile, "calcium chloride", True)
	#epilog
	return (HttpResponse(request.body))

def fileTestGet(request):
	#prolog
	
	#body 
	toReturn = SVSEncryptionFactory.svsUnsign(myFile, "calcium chloride", True)
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
	
	print(SVSSessionFactory.getFromSession(request, "testKey")) #test sessions
	
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
	print(data)
	
	response = {"message": data}
	
	
	#epilog 
	return HttpResponse(response)