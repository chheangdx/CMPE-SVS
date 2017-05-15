import ast
import pymongo
import gridfs
from pymongo import MongoClient
from django.template import loader
from django.http import HttpResponse
from .com.cmpe.svs.assisitivedoc import ADPService
from .com.cmpe.svs.accounts.service import MongoService
from django.contrib.staticfiles.templatetags.staticfiles import static

def addCategory(request):			#admin function
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = MongoService.service("addCategory", data, httprequest);
	print("Returning data for addCategory command:")
	print(response)
	return HttpResponse(json.dumps(response))

def getCategory(request):
	httprequest = request
	response = MongoService.service("getCategory", "", httprequest);
	print("Returning data for getCategory command:")
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

def saveAnnotatedDocument(request):
	httprequest  = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = ADPService.service("saveAnnotatedDocument", data, httprequest)
	print("Returning data for saveAnnotatedDocumentcommand:")
	print(response)
	return HttpResponse(json.dumps(response))


def adminGetDocumentList(request):	# admin function
	httprequest = request
	response = ADPService.service("adminGetDocumentList", " ",  httprequest)
	print("Returning data for adminGetDocumentList List:")
	print(response)
	return HttpResponse(json.dumps(response))