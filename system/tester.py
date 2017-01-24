from django.http import HttpResponse
from django.template import loader
from .com.cmpe.svs.watson.controllers.QAController import controller
import json
import ast

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	#if body = {"message": "hello"}, then you access like body["message"]
   
	#TODO: Test stuff here 
	response = {"message": "hello", "name": "dude"} #WHAT YOU ARE RETURNING 
	
   
	#epilog 
	return HttpResponse(json.dumps(response))