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
	#response = crawlerController.simpleCrawl(thisurl)
	#response = crawlerController.parseText(thisurl)
	response = crawlerController.crawl(thisurl)
	
	#epilog 
	return HttpResponse(response)

def login(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)

	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 
	return HttpResponse(json.dumps(response))



def createAccount(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	
   	
   	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 
	return HttpResponse(json.dumps(response))
	
	
def fileTest(request):
	#prolog
	
	#body
	global myFile
	myFile = request.body
	
	#epilog
	return (HttpResponse(request.body))

def fileTestGet(request):
	#prolog
	
	#body 
	
	#epilog
	return (HttpResponse(myFile))
def annotationTest(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	
	#body
	global myAnnotations
	myAnnotations = body['annotations']
	
	#epilog
	return (HttpResponse(request.body))
	
def annotationTestGet(request):
	
	return (HttpResponse(json.dumps(myAnnotations)))
