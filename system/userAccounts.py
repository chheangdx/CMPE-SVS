
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
	response = MongoService.service("login", data, httprequest)
	print("Returning data for login command:")
	print(response)
	return HttpResponse(json.dumps(response))


def createAccount(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("createAccount", data, httprequest)
	print(response)
	return HttpResponse(json.dumps(response))

def logout(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("logout", data, httprequest)
	print(response)
	return HttpResponse(json.dumps(response))
	
def whoAmI(request):
	httprequest = request
	response = MongoService.service("whoAmI", "", httprequest)
	print(response)
	return HttpResponse(json.dumps(response))

def editAccountInformation(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("editAccountInformation","", httprequest)
	print("Returning data for editAccountInformation command:")
	print(response)
	return HttpResponse(json.dumps(response))

def getAccountInformation(request):
	httprequest = request
	response = MongoService.service("getAccountInformation", "", httprequest)
	print("Returning data for getAccountInformation command:")
	print(response)
	return HttpResponse(json.dumps(response))