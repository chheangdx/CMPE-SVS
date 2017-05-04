

import pymongo

from pymongo import MongoClient

import json

import gridfs

import time

from ..utility import SVSSessionFactory


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





    

def adminSaveAnnotatedDocument(fs, username, documentName, category, documentData, documentAnnotation):
    if(fs.find_one({"username": username}, {"documentName": documentName})):
        documentInformation = fs.find_one({"username": username}, {"documentName": documentName})
        date = documentInformation['date']
        fs.delete({"username": username, "documentName": documentName})
    else:
        print("DOCUMENT COULD NOT BE FOUND.")
    
    fs.put(documentData, username = username, documentName = documentName, documentAnnotation = documentAnnotation, status = "Reviewed",date = date, annotatedate= time.strftime("%m/%d/%Y"), category = category)

    response = {"request": "TRUE"}

    return response



def getAnnotations(fs, username, documentName):

    if(fs.find_one({"username": username}, {"documentName": documentName})):
        documentInformation = fs.find_one({"username": username}, {"documentName": documentName})
        response = {"documentAnnotation": documentInformation['documentAnnotation']}
    else:
        response = {"request": "FALSE", "error": "No documents found."}

    return response

def getDocument(fs, username, documentName):

    

    if(fs.find_one({"documentName": documentName, "username": username})):

        documentData = fs.find_one({"documentName": documentName, "username": username})

        response =  documentData

    else:

        response = {"request": "FALSE", "error": "Document not found."}

    return response






def getDocumentNameList(fsfiles, username):

    response = []
    if(fs.find_one({"username": username})):
        for doc in fsfiles.find({"username": username}):
                tempobject = {"documentName": doc['documentName'], "status": doc['status'], "date": doc['date'], "category": doc['category']}
                response.append(tempobject)
    else:
        response = {"request": "FALSE", "error": "No documents found."}

    return response





def saveDocument(fs, username, documentName, documentData, category):
 
    documentLoop = True
    tempDocumentName = documentName
    count = 1
    while(documentLoop):
        if(fs.find_one({"documentName": tempDocumentName, "username": username})):
            tempDocumentName = documentName + "(" + str(count) + ")"
            count += 1
        else:
            documentLoop = False

        
    fs.put(documentData, username = username, documentName = tempDocumentName, status = "Incomplete", date= time.strftime("%m/%d/%Y"), annotatedate = "00/00/00", category = category)

    response = {"request": "TRUE"}

    return response





def deleteDocument(fs, username, documentName):

    fs.delete({"username": username, "documentName": documentName})

    response = {"request": "TRUE"}

    return response









def service(request, data, httprequest):

    global fs
    global db
    global documentName
    global documentAnnotation
    global annotatedDocumentName
    global fsfiles
    dataRequest = data

   

    username = SVSSessionFactory.getFromSession(httprequest, "username", "BLANK")

    if(username == "BLANK"):
        response = {"request": "FALSE" , "error": "USER IS NOT LOGGED IN."}
        raise Exception("YOU DONE GOOFED. NOT EVEN LOGGED IN BRO.")
    else:

        if(request == "getAnnotations"):
            response = getAnnotations(fs, username, annotatedDocumentName )

        if(request == "getDocument"):
            response = getDocument(fs, username,documentName)
            documentName = "BLANK"


        if(request == "getDocumentNameList"):
            response = getDocumentNameList(fsfiles, username)

        if(request == "saveDocument"):
            documentData = data
            response = saveDocument(fs, username, documentName, documentData, " ")
            documentName = "BLANK"

        if(request == "deleteDocument"):    
            response = deleteDocument(fs, username, documentName)

        if(request == "saveDocumentName"):
            response = {"request": "TRUE"}
            documentName = dataRequest['documentName']

        if(request == "saveAnnotatedDocumentName"):
            response = {"request": "TRUE"}
            annotatedDocumentName = dataRequest['documentName']

        if(request == "saveAnnotationAnnotations"):
            response = {"request": "TRUE"}
            documentAnnotation = dataRequest['annotations']
            print("SAVED ANNOTATION IS : ")
            print(documentAnnotation)

        if(request == "saveAnnotatedDocument"):
            documentData = data
            response = adminSaveAnnotatedDocument(fs, username, annotatedDocumentName, " ", documentData, documentAnnotation)
            annotatedDocumentName = "BLANK"
            documentAnnotation = []


    
    return response





databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
fsfiles = db.fs.files
fs = gridfs.GridFS(db)
documentName = ""
annotatedDocumentName = ""
documentAnnotation  = []