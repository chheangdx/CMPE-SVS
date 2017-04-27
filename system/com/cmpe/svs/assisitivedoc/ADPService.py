
import pymongo
from pymongo import MongoClient
import json
import gridfs

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
        response = {"request": "TRUE", "data": documentData} 
    else:
        response = {"request": "FALSE", "error": "Document not found."}
    return response

def getDocumentNameList(fs, username):
    for grid_out in fs.find({"username": username},
                        no_cursor_timeout=True):
            data = grid_out.read()
    response = {"request": "TRUE", "data": data} 
    return response


def saveDocument(fs, username, documentName, documentData):
    fs.put(documentData, username = username, documentName = documentName, status = "incomplete")
    response = {"request": "TRUE"}
    return response


def deleteDocument(fs, username, documentName):
    fs.delete({"username": username, "documentName": documentName})
    response = {"request": "TRUE"}
    return response




def service(request, data):
    global fs
    global db
    global documentName
    dataRequest = data
    username = "kickthecann"

    if(request == "getDocument"):
        response = getDocument(fs, username)

    if(request == "getDocumentNameList"):
        response = getDocumentNameList(fs, username)

    if(request == "saveAnnotatedDocument"):     
        response = adminSaveAnnotatedDocument(fs, username, documentName, documentData)  
        documentName = "BLANK1"

    if(request == "saveDocument"):
        documentData = data
        response = saveDocument(fs, username, documentName, documentData)
        documentName = "BLANK"


    if(request == "deleteDocument"):    
        response = deleteDocument(fs, username, documentName)

    if(request == "saveDocumentName"):
        response = {"request": "TRUE"}
        documentName = dataRequest['documentName']
    return response


databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
fs = gridfs.GridFS(db)
documentName = ""