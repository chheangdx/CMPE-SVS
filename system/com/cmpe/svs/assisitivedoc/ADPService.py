

import pymongo

from pymongo import MongoClient

import json

import gridfs


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





    

def adminSaveAnnotatedDocument(fs, username, documentName, documentData):

    fs.put(documentData, username = username, documentName = documentName, status = "complete")

    response = {"request": "TRUE"} 

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
    for doc in fsfiles.find({"username": username}):
            tempobject = {"documentName": doc['documentName'], "status": doc['status']}
            response.append(tempobject)

    return response





def saveDocument(fs, username, documentName, documentData):

    fs.put(documentData, username = username, documentName = documentName, status = "incomplete")

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

    global fsfiles

    dataRequest = data

    #username = "kickthecann"



    if(request == "getDocument"):
        username = SVSSessionFactory.getFromSession(httprequest, "username")
        response = getDocument(fs, username,documentName)

        documentName = "BLANK"



    if(request == "getDocumentNameList"):
        username = SVSSessionFactory.getFromSession(httprequest, "username")
        response = getDocumentNameList(fsfiles, username)



    if(request == "saveAnnotatedDocument"):     
        username = SVSSessionFactory.getFromSession(httprequest, "username")
        response = adminSaveAnnotatedDocument(fs, username, documentName, documentData)  

        documentName = "BLANK1"



    if(request == "saveDocument"):
        username = SVSSessionFactory.getFromSession(httprequest, "username")
        documentData = data

        response = saveDocument(fs, username, documentName, documentData)

        documentName = "BLANK"





    if(request == "deleteDocument"):    
        username = SVSSessionFactory.getFromSession(httprequest, "username")
        response = deleteDocument(fs, username, documentName)



    if(request == "saveDocumentName"):

        response = {"request": "TRUE"}

        documentName = dataRequest['documentName']

    return response





databaseName = 'TestDB'
db = connectToMongoDB(databaseName)

fsfiles = db.fs.files

fs = gridfs.GridFS(db)

documentName = ""