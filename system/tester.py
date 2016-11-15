from django.http import HttpResponse
from django.template import loader
import json

def index(request):
	template = loader.get_template('base/tester.html')
	context = {}
	return HttpResponse(template.render(context, request))

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	#if body = {"message": "hello"}, then you access like body["message"]
	
	#TODO: Test stuff here
	response = {"message": "hello"} #WHAT YOU ARE RETURNING
	
	#epilog
	return HttpResponse(response)