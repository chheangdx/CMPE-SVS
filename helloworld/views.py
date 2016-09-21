from django.http import HttpResponse
from django.template import loader
from . import pymongodb
import json

def index(request):
	template = loader.get_template('helloworld/index.html')
	context = {}
	return HttpResponse(template.render(context, request))

def hello(request):
	template = loader.get_template('helloworld/helloworld.html')
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	helloAngular = "Hello World from Angular! We welcome:" + body['message']
	
	pymongodb.insert_data(pymongodb.get_db(), body['message'])

	mongo = list(pymongodb.retrieve_data(pymongodb.get_db(), body['message']))
	
	context = {'messageAngJS': helloAngular, 'messageMonDB': mongo[0]['title']}
	return HttpResponse(template.render(context, request))