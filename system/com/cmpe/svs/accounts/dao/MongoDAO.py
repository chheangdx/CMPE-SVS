from ..service import MongoService

def dataAcessObject(request, data):
	return MongoService.service(request, data)