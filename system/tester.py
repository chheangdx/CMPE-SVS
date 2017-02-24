from django.http import HttpResponse
from django.template import loader
import json
import ast

#web crawler imports
import urllib
import HTMLParser

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.accounts.controllers import AccountsController	# account controller

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	#if body = {message: "hello"}, then you access like body["message"]
   	
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