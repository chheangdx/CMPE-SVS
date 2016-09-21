from django.http import HttpResponse
from django.template import loader
import json

def index(request):
	template = loader.get_template('helloworld/index.html')
	context = {}
	return HttpResponse(template.render(context, request))

def hello(request):
	template = loader.get_template('helloworld/helloworld.html')
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	context = {'message': body['message']}
	return HttpResponse(template.render(context, request))