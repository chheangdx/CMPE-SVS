
import json
import ast
import pymongo
import gridfs
from pymongo import MongoClient
from django.template import loader
from django.http import HttpResponse
from .com.cmpe.svs.accounts.service import MongoService
from django.contrib.staticfiles.templatetags.staticfiles import static


def login(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("login", data, httprequest);
	print("Returning data for login command:")
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
	
def addCategory(request):			#admin function
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("addCategory", data, httprequest);
	print("Returning data for addCategory command:")
	print(response)
	return HttpResponse(json.dumps(response))


def deleteCategory(request):	# admin function
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("deleteCategory", data, httprequest);
	print("Returning data for deleteCategory command:")
	print(response)
	return HttpResponse(json.dumps(response))