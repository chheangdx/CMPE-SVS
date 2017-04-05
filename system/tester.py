from django.http import HttpResponse
from django.template import loader
from django.contrib.staticfiles.templatetags.staticfiles import static
import json
import ast
import pymongo
from pymongo import MongoClient
import gridfs

#web crawler imports
import urllib

#our controller
from .com.cmpe.svs.webcrawler.controllers import crawlerController

from .com.cmpe.svs.accounts.controllers import AccountsController	# account controller

count = 0
myFile = 0


def connectToMongoDB(databaseName):
    print("Connecting to MongoDB...documents")
    client = MongoClient('aws-us-east-1-portal.17.dblayer.com', 15319)
    if not client:
        print("MongoDB Error: Could not connect to DB.")
    db = client[databaseName]
    db.authenticate('cann', 'cannpassword', mechanism = 'SCRAM-SHA-1')
    if not(db):
    	print("error")
    return db
    
def uploadDocument(db, file):
    print("Uploading pdf..")
    document = {"document": file}
    db.insert_one(document)


    
def test(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)
	global count
	#if body = {message: "hello"}, then you access like body["message"]
	print ("******"+ str(count) + "******")
	count = count + 1
	print (body)
	#TODO: Test stuff here 
	response = {"message": "hello", "name": "dude"} #WHAT YOU ARE RETURNING 
	
	#epilog 
	return HttpResponse(json.dumps(response))


def webcrawler(request):
	#prolog
	body_unicode = request.body.decode('utf-8')
	body = json.loads(body_unicode)

	#body 
	thisurl = body["data"]
	#response = crawlerController.simpleCrawl(thisurl)
	#response = crawlerController.parseText(thisurl)
	response = crawlerController.crawl(thisurl)
	
	#epilog 
	return HttpResponse(response)

def login(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = AccountsController.controller("login", data);
	print("Returning data:")
	print(response)


	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 

	return HttpResponse(json.dumps(response))


def createAccount(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = AccountsController.controller("createAccount", data);
	print(response)
	return HttpResponse(json.dumps(response))

def logout(request):
	body_unicode = request.body.decode('utf-8')
	data = json.loads(body_unicode)
	response = AccountsController.controller("logout", data);
	print(response)
	return HttpResponse(json.dumps(response))
	
   	
   	print("Received Command: Login.")

	response = AccountsController.controller("login", data)

	#epilog 
	return HttpResponse(json.dumps(response))
	
	
def fileTest(request):
	databaseName = 'TestDB'
	db = connectToMongoDB(databaseName)
	fs = gridfs.GridFS(db)


	global myFile
	myFile = request.body
	testfile = fs.put(myFile, filename = "pdf21", username = "kickthecann3")
	out = fs.get(testfile)



	print("bloop")
	print(out)
	#uploadDocument(db, myFile)


	return (HttpResponse(request.body))

def fileTestGet(request):
	databaseName = 'TestDB'
	db = connectToMongoDB(databaseName)
	fs = gridfs.GridFS(db)

	for grid_data in fs.find({"username":"kickthecann3","filename": "pdf21"}, no_cursor_timeout=True):
    		data = grid_data.read()

 

	return (HttpResponse(data))

