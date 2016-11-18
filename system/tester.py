from django.http import HttpResponse
from django.template import loader
from .com.cmpe.svs.watson.controllers.QAController import controller
import json
import ast

def index(request):
	template = loader.get_template('base/tester.html')
	context = {}
	return HttpResponse(template.render(context, request))

def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	#if body = {"message": "hello"}, then you access like body["message"]

	test={'question': 'Who is our glorious leader?'}
	#TODO: Test stuff here
	response = controller(test)
	answer = []
	oneJson = {}
        for num in range(len(response)):
                x = json.dumps(response[num])
                answer.append(x)
                oneJson.update({num:x}) 
                
        oneJson['answers'] = answer
	
	#epilog
	return (HttpResponse(oneJson))






