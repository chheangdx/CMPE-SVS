from ..service import MongoService

def dataAccessObject(request):
	return MongoService.service(request)