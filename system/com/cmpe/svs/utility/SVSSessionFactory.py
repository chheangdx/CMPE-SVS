#Session implementation for Smart Visitor System

#keys are strings

def getFromSession(request, key, defaultValue):
	toReturn = request.session.get(key, defaultValue)
	return toReturn
	
#values can be anything, usually string or boolean

def setInSession(request, key, value):
	request.session[key] = value
	return True

def deleteSession(request, key):
	try:
		del request.session[key]
	except:
		pass
	return HttpResponse("<strong> You are Logged out. </strong>")