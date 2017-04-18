from ..service import WatsonService

def dataAccessObject(request):

    return WatsonService.getTopAnswers(request)
