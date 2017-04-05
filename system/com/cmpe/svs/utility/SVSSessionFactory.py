#Session implementation for Smart Visitor System

#keys are strings

def getFromSession(request, key):
	toReturn = request.session[key]
	return toReturn
	
#values can be anything, usually string or boolean

def setInSession(request, key, value):
	request.session[key] = value
	return True