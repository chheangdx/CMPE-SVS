from ..dao import WatsonDAO
from ..utility import Converter
import json




def service(request):
     query = request['question']
     return WatsonDAO.dataAccessObject(query)


    
