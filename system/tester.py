from django.http import HttpResponse
from django.template import loader
import json
import ast

#web crawler imports
import urllib

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.accounts.controllers import AccountsController	# account controller

count = 0

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	global count
	#if body = {message: "hello"}, then you access like body["message"]
	print ("******"+ str(count) + "******")
	count = count + 1
	print (body);
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
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = AccountsController.controller("login", data);
	print("Returning data:")
	print(response)
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