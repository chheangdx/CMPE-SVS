

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





    

def adminSaveAnnotatedDocument(fs, username, documentName, category, status,  documentAnnotation,fsfiles):


    if(fsfiles.find_one({"username": username, "documentName": documentName})):
        documentInformation = fsfiles.find_one({"username": username, "documentName": documentName})
        documentInformation['annotateDate'] = time.strftime("%m/%d/%Y")
        documentInformation['documentAnnotation'] = documentAnnotation
        documentInformation['status'] = status
        print("**************ADMIN SAVE ANNOTATED DOCUMENT CHEKCER**************")
        print(documentInformation)
        fsfiles.save(documentInformation)
        response = {"request": "TRUE"}
    else:
        response = {"request": "FALSE", "error": "Previous document could not be found."}
    return response



def getAnnotations(fsfiles, username, documentName):    
    print("USER NAME:")
    print(username)
    print("doc name:")
    print(documentName)

    if(fsfiles.find_one({"username": username, "documentName": documentName})):
        documentInformation = fsfiles.find_one({"username": username, "documentName": documentName})
        response = {"documentAnnotation": documentInformation['documentAnnotation']}
    else:
        response = {"request": "FALSE", "error": "No annotation documents found."}
    return response

def getDocument(fs, username, documentName):

    print("USER NAME:")
    print(username)
    print("doc name:")
    print(documentName)

    if(fs.find_one({"documentName": documentName, "username": username})):

        documentData = fs.find_one({"documentName": documentName, "username": username})

        response =  documentData

    else:

        response = {"request": "FALSE", "error": "Document not found."}

    return response






def getDocumentNameList(fsfiles, username):

    response = []
    if(fsfiles.find_one({"username": username})):
        for doc in fsfiles.find({"username": username}):
                tempobject = {"documentName": doc['documentName'], "status": doc['status'], "date": doc['date'], "category": doc['category'], "annotateDate": doc['annotateDate']}
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

        
    fs.put(documentData, username = username, documentName = tempDocumentName, status = "Incomplete", date= time.strftime("%m/%d/%Y"), annotateDate = "00/00/00", documentAnnotation = " ", category = category)

    response = {"request": "TRUE"}

    return response





def deleteDocument(fs, username, documentName, fsfiles):

    if(fsfiles.find_one({"documentName": documentName, "username": username})):
        documentInformation = fsfiles.find_one({"documentName": documentName, "username": username})
        tag = documentInformation['_id']
        fs.delete(tag)
        response = {"request": "TRUE"}

    else:

        response = {"request": "FALSE", "error": "Document not found."}
  
    return response









def service(request, data, httprequest):

    global fs
    global db
    global documentName
    global documentAnnotation
    global annotatedDocumentName
    global fsfiles
    global temporaryCategory
    dataRequest = data

   

    username = SVSSessionFactory.getFromSession(httprequest, "username", "BLANK")

    if(username == "BLANK"):
        response = {"request": "FALSE" , "error": "USER IS NOT LOGGED IN."}
        raise Exception("YOU DONE GOOFED. NOT EVEN LOGGED IN BRO.")
    else:

        if(request == "getAnnotations"):
            response = getAnnotations(fsfiles, username, annotatedDocumentName )
            annotatedDocumentName = "BLANK"

        if(request == "getDocument"):
            response = getDocument(fs, username, documentName)
            documentName = "BLANK"

        if(request == "getAnnotatedDocument"):
            response = getDocument(fs, username, annotatedDocumentName)


        if(request == "getDocumentNameList"):
            response = getDocumentNameList(fsfiles, username)

        if(request == "saveDocument"):
            documentData = data
            response = saveDocument(fs, username, documentName, documentData, temporaryCategory)
            documentName = "BLANK"
            temporaryStatus = "BLANK"

        if(request == "deleteDocument"):    
            documentName = dataRequest['documentName']
            response = deleteDocument(fs, username, documentName, fsfiles)
            documentName = "BLANK"

        if(request == "saveDocumentName"):
            response = {"request": "TRUE"}
            documentName = dataRequest['documentName']
            temporaryCategory = dataRequest['category']


        if(request == "saveAnnotatedDocument"):
            annotatedDocumentName = dataRequest['documentName']
            documentAnnotation = dataRequest['annotations']
            category = dataRequest['category']
            status = dataRequest['status']
            response = adminSaveAnnotatedDocument(fs, username, annotatedDocumentName, category, status, documentAnnotation, fsfiles)
            annotatedDocumentName = "BLANK"
            documentAnnotation = []
            annotatedDocumentName = "BLANK"
            status = "BLANK"

      


    
    return response





databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
fsfiles = db.fs.files
fs = gridfs.GridFS(db)
documentName = "BLANK"
annotatedDocumentName = "BLANK"
temporaryCategory = "BLANK"
documentAnnotation  = []