from django.http import HttpResponse
from django.template import loader
from .watson import rank_retrieve
import json

def index(request):
	template = loader.get_template('svs_qa/index.html')
	context = {"answer": rank_retrieve.retrieve_and_rank("Who is our leader?")[0]['body']}
	return HttpResponse(template.render(context, request))