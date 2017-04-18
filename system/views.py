from django.http import HttpResponse
from django.template import loader
from django.contrib.staticfiles.templatetags.staticfiles import static
from .com.cmpe.svs.watson.controllers.QAController import controller
import json
import ast

# Create your views here.
def index(request):
	template = loader.get_template('base/base.html')
	staticpath=static('')
	context = {'staticpath':staticpath}
	return HttpResponse(template.render(context, request))
	
def pdfview(request):
	template = loader.get_template('pdfviewhelloworld.html')
	staticpath=static('')
	context = {'staticpath':staticpath}
	return HttpResponse(template.render(context, request))

def watsonq(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	response = controller(body)
	answer = {}
	#print(response)
	for num in range(len(response)):
    		answer[str(num)]=[response[num]['body'], response[num]['score'], response[num]['contentHtml']]
	
	#epilog
	return (HttpResponse(json.dumps(answer)))
