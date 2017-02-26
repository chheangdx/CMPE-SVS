from ..dao import MongoDAO

def service(request, data):
	return MongoDAO.dataAcessObject(request, data)