import ast
import pymongo
import gridfs
from pymongo import MongoClient
from django.template import loader
from django.http import HttpResponse
from .com.cmpe.svs.assisitivedoc import ADPService
from django.contrib.staticfiles.templatetags.staticfiles import static




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

def saveDocument(request):
	httprequest  = request
	myFile = request.body
	response = ADPService.service("saveDocument", myFile, httprequest)
	print("Returning data for saveDocument command:")
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

def deleteDocument(request):
	httprequest = request
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = ADPService.service("deleteDocument", data, httprequest)
	print("Returning data for deleteDocument command:")
	print(response)
	return HttpResponse(json.dumps(response))
