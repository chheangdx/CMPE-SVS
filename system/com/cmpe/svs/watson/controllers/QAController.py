from ..service import QueryService 


def controller(request):
    
    return QueryService.service(request)
