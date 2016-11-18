from django.http import HttpResponse
from django.template import loader
from django.contrib.staticfiles.templatetags.staticfiles import static

# Create your views here.
def index(request):
	template = loader.get_template('base/base.html')
	staticpath=static('');
	context = {'staticpath':staticpath}
	return HttpResponse(template.render(context, request))
