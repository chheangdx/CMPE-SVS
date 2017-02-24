from ..service import RouterService

def controller(request):
	return RouterService.service(request)