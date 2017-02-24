from ..dao import MongoDAO

def service(request):
	return MongoDAO.dataAcessObject(request)