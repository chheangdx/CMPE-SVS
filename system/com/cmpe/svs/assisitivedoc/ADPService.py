

import pymongo

from pymongo import MongoClient

import json

import gridfs

import time
from ..utility import SVSSessionFactory
from ..utility import SVSEncryptionFactory
from django.core.mail import send_mail
from ..accounts.service import MongoService


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

def connectToMongoDBAccounts(databaseName):
    print("Connecting to MongoDB...")
    client = MongoClient('aws-us-east-1-portal.17.dblayer.com', 15319)
    if not client:
        print("MongoDB Error: Could not connect to DB.")
    db = client[databaseName]
    db.authenticate('cann', 'cannpassword', mechanism = 'SCRAM-SHA-1')
    return db.Accounts
    
def adminSaveAnnotatedDocument(fs, username, documentName, category, status,  documentAnnotation,fsfiles):
    global dbaccounts
    if(fsfiles.find_one({"username": username, "documentName": documentName})):
        documentInformation = fsfiles.find_one({"username": username, "documentName": documentName})
        documentInformation['documentAnnotation'] = documentAnnotation
        documentInformation['status'] = status
        documentInformation['category'] = category
        fsfiles.save(documentInformation)
        response = {"request": "TRUE"}
       # if(documentInformation['status'] == "Reviewed"):
        #    studentEmail = MongoService.getEmail(dbaccounts, documentInformation['username'])
         #   adminEmail = MongoService.getEmail(dbaccounts, "admin")
          #  adminEmailPassword = MongoService.getEmailPassword(dbaccounts,"admin")
           # send_mail(subject='SVS NOTIFICATION: YOUR DOCUMENT: "' + documentInformation['documentName'] + '" HAS BEEN REVIEWED', message='Please mark the document as complete if you are satisfied with the review.', from_email= adminEmail, recipient_list=[studentEmail], 
            #fail_silently=False, auth_user= adminEmail, auth_password= adminEmailPassword)
         
    else:
        response = {"request": "FALSE", "error": "Previous document could not be found."}
    return response

def getAnnotations(fsfiles, username, documentName):    
    if(fsfiles.find_one({"username": username, "documentName": documentName})):
        documentInformation = fsfiles.find_one({"username": username, "documentName": documentName})
        response = {"documentAnnotation": documentInformation['documentAnnotation']}
    else:
        response = {"request": False, "error": "No annotation documents found."}
    return response


def adminGetDocument(fs, username, documentName):
     if(fs.find_one({"documentName": documentName, "username": username})):
        documentData = fs.find_one({"documentName": documentName, "username": username}).read()
         documentData = SVSEncryptionFactory.svsUnsign(documentData, "document", True)
         documentData = SVSEncryptionFactory.svsDecrypt(documentData, "document", True)
        documentData = SVSEncryptionFactory.svsUnsign(documentData, "document", True)
        response =  documentData
    else:
        response = {"request": False, "error": "Document not found."}
    return response

def adminGetAnnotations(fsfiles, username, documentName):
    if(fsfiles.find_one({"username": username, "documentName": documentName})):
         documentInformation = fsfiles.find_one({"username": username, "documentName": documentName})
         response = {"documentAnnotation": documentInformation['documentAnnotation']}
    else:
         response = {"request": False, "error": "No annotation documents found."}
    return response


def getDocument(fs, username, documentName):
    if(fs.find_one({"documentName": documentName, "username": username})):
        documentData = fs.find_one({"documentName": documentName, "username": username}).read()
        documentData = SVSEncryptionFactory.svsUnsign(documentData, "document", True)
        documentData = SVSEncryptionFactory.svsDecrypt(documentData, "document", True)
        documentData = SVSEncryptionFactory.svsUnsign(documentData, "document", True)
        response =  documentData
    else:
        response = {"request": False, "error": "Document not found."}
    return response

def adminGetDocumentList(fsfiles):
    docList = []
    if(fsfiles.find()):
        for doc in fsfiles.find():
             tempobject = {"username": doc['username'], "documentName": doc['documentName'], "status": doc['status'], "date": doc['date'], "category": doc['category']}
             docList.append(tempobject)

        response = {"request": True, "documentList": docList}
    else:
         response = {"request": False, "error": "No documents found."}
    return response

def getDocumentNameList(fsfiles, username):
    docList = []
    if(fsfiles.find_one({"username": username})):
        for doc in fsfiles.find({"username": username}):
                tempobject = {"documentName": doc['documentName'], "status": doc['status'], "date": doc['date'], "category": doc['category']}
                docList.append(tempobject)
        response = {"request": True, "documentList": docList}
    else:
        response = {"request": False, "error": "No documents found."}
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
    documentData = SVSEncryptionFactory.svsSign(documentData, "document", True)
    documentData = SVSEncryptionFactory.svsEncrypt(documentData, "document")
    documentData = SVSEncryptionFactory.svsSign(documentData, "document", True)
    fs.put(documentData, username = username, documentName = tempDocumentName, status = "Incomplete", date= time.strftime("%m/%d/%Y"), documentAnnotation = " ", category = category)
    #adminEmail = MongoService.getEmail(dbaccounts, "admin")
    #adminEmailPassword = MongoService.getEmailPassword(dbaccounts, "admin")
    #send_mail(subject='SVS NOTIFICATION: A DOCUMENT HAS BEEN UPLOADED: "' + documentName + '" FOR REVIEW', message='Please mark the document as reviewed when finished.', from_email= adminEmail, recipient_list=[adminEmail], 
    #fail_silently=False, auth_user= adminEmail, auth_password= adminEmailPassword)
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
    global adminDocumentName
    global adminAnnotatedDocumentName
    global temporaryUsername
    global documentAnnotation
    global annotatedDocumentName
    global fsfiles
    global temporaryCategory
    dataRequest = data


    username = SVSSessionFactory.getFromSession(httprequest, "username", "BLANK")

    if(username == "BLANK"):
        response = {"request": "FALSE" , "error": "USER IS NOT LOGGED IN."}

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


        if(request == "saveAnnotatedDocumentName"):
            response = {"request": "TRUE"}
            annotatedDocumentName = dataRequest['documentName']
            temporaryCategory = dataRequest['category']


        if( request == "saveAnnotatedDocument" or request == "adminGetDocumentList" or request == "adminSaveDocumentName" or request = "adminGetDocument" or request == "adminGetAnnotatedDocument" or request == "adminGetAnnotations")
            if(username == "admin"):
                if(request == "saveAnnotatedDocument"):
                    annotatedDocumentName = dataRequest['documentName']
                    documentAnnotation = dataRequest['annotations']
                    category = dataRequest['category']
                    status = dataRequest['status']
                    actualUsername = dataRequest['username']
                    response = adminSaveAnnotatedDocument(fs, actualUsername, annotatedDocumentName, category, status, documentAnnotation, fsfiles)
                    annotatedDocumentName = "BLANK"
                    documentAnnotation = []
                    annotatedDocumentName = "BLANK"
                    status = "BLANK"

                if(request == "adminGetDocumentList"):
                    response = adminGetDocumentList(fsfiles)

                if(request == "adminSaveDocumentName"):
                    response = {"request": "TRUE"}
                    adminDocumentName = dataRequest['documentName']
                    temporaryUsername = dataRequest['username']
                 
                if(request == "adminSaveAnnotatedDocumentName"):
                    response = {"request": "TRUE"}
                    adminAnnotatedDocumentName = dataRequest['documentName']
                    temporaryUsername = dataRequest['username']

                if(request == "adminGetDocument"):
                    response = adminGetDocument(fs, temporaryUsername, adminDocumentName)
                    adminDocumentName = "BLANK"
                    temporaryUsername = "BLANK"

                if(request == "adminGetAnnotatedDocument"):
                       response = getDocument(fs, temporaryUsername, adminAnnotatedDocumentName)

                if(request == "adminGetAnnotations"):
                    response = getAnnotations(fsfiles, temporaryUsername, adminAnnotatedDocumentName )
                    adminAnnotatedDocumentName = "BLANK"
                    temporaryUsername = "BLANK"

            else:
                print("YOU ARE NOT AN ADMIN.")
           

      
    return response



databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
dbaccounts = connectToMongoDBAccounts(databaseName)
fsfiles = db.fs.files
fs = gridfs.GridFS(db)
documentName = "BLANK"
adminDocumentName = "BLANK"
annotatedDocumentName = "BLANK"
adminAnnotatedDocumentName = "BLANK"
temporaryCategory = "BLANK"
documentAnnotation  = []
temporaryUsername = "BLANK"