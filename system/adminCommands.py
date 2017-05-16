import ast
import pymongo
import gridfs
import json
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


def adminGetDocument(request):
	httprequest = request
	response = ADPService.service("adminGetDocument", "", httprequest)
	print("ADMIN Returning data for getDocument command:")
	return HttpResponse(response)

def adminGetAnnotatedDocument(request):
	httprequest = request
	response = ADPService.service("adminGetAnnotatedDocument", "", httprequest)
	print("ADMIN Returning data for getAnnotatedDocument command:")
	return HttpResponse(response)

def adminGetAnnotations(request):
	httprequest = request
	response = ADPService.service("adminGetAnnotations", "", httprequest)
	print("ADMIN Returning data for getAnnotation command:")
	print(response)
	return HttpResponse(json.dumps(response))

def adminSaveDocumentName(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	print("ADMIN SAVE DOCUMENT NAME REQUEST: ")
	print(data)
	response = ADPService.service("adminSaveDocumentName", data, httprequest)
	print("Returning data for adminSaveDocumentName command:")
	print(response)
	return HttpResponse(json.dumps(response))

def adminSaveAnnotatedDocumentName(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	print("ADMIN SAVE DOCUMENT NAME REQUEST: ")
	print(data)
	response = ADPService.service("adminSaveAnnotatedDocumentName", data, httprequest)
	print("Returning data for adminSaveAnnotatedDocumentName command:")
	print(response)
	return HttpResponse(json.dumps(response))

