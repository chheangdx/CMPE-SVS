from ..service import RouterService

def controller(request, data):
	return RouterService.service(request, data)