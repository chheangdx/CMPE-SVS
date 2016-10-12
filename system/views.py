from django.shortcuts import render

# Create your views here.
def index(request):
	template = loader.get_template('welcome/index.html')
	context = {}
	return HttpResponse(template.render(context, request))