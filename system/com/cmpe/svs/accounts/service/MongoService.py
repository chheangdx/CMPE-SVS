import pymongo
from pymongo import MongoClient
import json
from ...utility import SVSSessionFactory
from ...utility import SVSEncryptionFactory

def connectToMongoDB(databaseName):
    print("Connecting to MongoDB...")
    client = MongoClient('aws-us-east-1-portal.17.dblayer.com', 15319)
    if not client:
        print("MongoDB Error: Could not connect to DB.")
    db = client[databaseName]
    db.authenticate('cann', 'cannpassword', mechanism = 'SCRAM-SHA-1')
    return db.Accounts
    
    
def login(db, username, password, httprequest):
    print("Authenticating Account..")
    if(db.find_one({"username": username})):
        accountInformation = db.find_one({"username": username})
        if (accountInformation['username'] == username):
            temporaryPassword =  accountInformation['password']
            temporaryPassword = SVSEncryptionFactory.svsUnsign(temporaryPassword, "password", True)
            temporaryPassword = SVSEncryptionFactory.svsDecrypt(temporaryPassword, "password", True)
            temporaryPassword = SVSEncryptionFactory.svsUnsign(temporaryPassword, "password", False)

            if (password == temporaryPassword):
                accountInformation['isLoggedIn'] = "true"
                print("Login Success: Account Information Authenticated.")
                response = {"login": "TRUE"}
                SVSSessionFactory.setInSession(httprequest, "username", accountInformation['username'])
                print("STORED USERNAME IS: ")
                print(SVSSessionFactory.getFromSession(httprequest, "username", "BLANK"))
            else:
                print("Login Error: Incorrect Password.")
                response = {"login": "FALSE", 
                            "error": "Incorrect Password." }
    else:
        print("Login Error: Username does not exist.")
        response = {"login": "FALSE",
                    "error:": "Username does not exist."}
    return response

def createAccount(db, username, password, email, firstName, lastName, isLoggedIn):
    accountInformation = {  "username":     username,
                            "password":     password,
                            "email":        email,
                            "firstName":    firstName,
                            "lastName":     lastName,
                            "isLoggedIn":   "True" }
                  
    result = db.create_index([('username', pymongo.ASCENDING)], unique=True)
    print("Creating Account..")
    if( db.find_one({"username": username})):
        print("Account Creation Error: Username already exists.")
        response = {"createAccount": "FALSE", 
                            "error": "Username already exists." }
    else:
        result = db.insert_one(accountInformation)
        print("Account Creation Success: Account created.")
        response = {"createAccount": "TRUE"}        
    return response

def editAccountInformation(db, username, email, oldPassword, newPassword, firstName, lastName):
    print("Editing Account Information..")
    if(db.find_one({"username": username})):
        accountInformation = db.find_one({"username": username})
        if (accountInformation['username'] == username):

            if(newPassword == "BLANK" and email == "BLANK"):
                accountInformation['firstName'] = firstName
                accountInformation['lastName'] = lastName
                db.save(accountInformation)
            else:
                temporaryPassword = accountInformation['password']
                temporaryPassword = SVSEncryptionFactory.svsUnsign(temporaryPassword, "password", True)
                temporaryPassword = SVSEncryptionFactory.svsDecrypt(temporaryPassword, "password", True)
                temporaryPassword = SVSEncryptionFactory.svsUnsign(temporaryPassword, "password", False)

                if (oldpassword == temporaryPassword):
                    accountInformation['firstName'] = firstName
                    accountInformation['lastName'] = lastName

                    if(accountInformation['email'] != "BLANK"):
                        accountInformation['email'] = email

                    if(accountInformation['newPassword'] != "BLANK"):
                        newPassword = SVSEncryptionFactory.svsSign(password, "password", False)
                        newPassword = SVSEncryptionFactory.svsEncrypt(password,"password")
                        newPassword = SVSEncryptionFactory.svsSign(password, "password", True)
                        accountInformation['password'] =  newPassword

                    db.save(accountInformation)
                    print("Edit Success: Account Information Changed.")
                    response = {"request": "TRUE"}
                else:
                    print("Request Error: Incorrect Old Password.")
                    response = {"request": "FALSE", 
                                "error": "Incorrect Old Password." , "errorId": 1}
    else:
        print("Username does not exist.")
        response = {"login": "FALSE",
                    "error:": "Username does not exist."}
    return response
        

def whoAmI(db, httprequest):
    username = SVSSessionFactory.getFromSession(httprequest, "username", "BLANK")
    if(username == "BLANK"):
        print("No one is logged in")
        return {"requset": "FALSE"}
    else:
        return username

def getAccountInformation(db, username):
    accountInformation = db.find_one({"username": username})
    tempobject = {"username": accountInformation['username'], "email": accountInformation['email'], "firstName": accountInformation['firstName'], "lastName":accountInformation['lastName']}
    return tempobject

def addCategory(db, username, category):
    print("Updating Category List...")
    if(db.find_one({"username": username})):
        accountInformation = db.find_one({"username": username})
        categoryList = accountInformation['categoryList']
        categoryList.append(category)
        db.save(accountInformation)
        response = {"categoryList": accountInformation['categoryList']}
    else:
        response = {"request": "FALSE", "error": "ADMIN ACCOUNT INACCESSIBLE."}

    return response

def deleteCategory(db, username, category):
    print("Deleting Category: ")
    print(category)
    if(db.find_one({"username": username})):
        accountInformation = db.find_one({"username": username})
        categoryList = accountInformation['categoryList']
        categoryList.remove(category)
        accountInformation['categoryList'] = categoryList
        db.save(accountInformation)
        response = {"categoryList": accountInformation['categoryList'] }
    else:
        response = {"request": "FALSE", "error": "ADMIN ACCOUNT INACCESSIBLE."}

    return response


def getCategory(db, username):
    print("Getting Category..")
    if(db.find_one({"username": username})):
        accountInformation = db.find_one({"username": username})
        categoryList = accountInformation['categoryList']
        response = {"categoryList": accountInformation['categoryList']}
    else:
        response = {"request": "FALSE", "error": "ADMIN ACCOUNT INACCESSIBLE."}

    return response


def logout(db, username, httprequest):
    accountInformation = db.find_one({"username": username})
    accountInformation['isLoggedIn'] = "False"
    db.save(accountInformation)
    print("Account Logged In Status: ") + accountInformation['isLoggedIn']
    response = {"logout": "TRUE"}
    SVSSessionFactory.deleteSession(httprequest, 'username')
    return response


def service(request, data, httprequest):
    global db
    accountInformation = data

    username = SVSSessionFactory.getFromSession(httprequest, "username", "BLANK")

    if(request == "login"):
        username = accountInformation['user']['username']
        username = username.lower()
        password = accountInformation['user']['password']
        response = login(db, username, password, httprequest)

    if(request == "createAccount"):
        username = accountInformation['user']['username']
        username = username.lower()
        password = accountInformation['user']['password']
        email = accountInformation['user']['email']
        firstName = accountInformation['user']['firstName']
        lastName = accountInformation['user']['lastName']
        isLoggedIn = "true"
        password = SVSEncryptionFactory.svsSign(password, "password", False)
        password = SVSEncryptionFactory.svsEncrypt(password,"password")
        password = SVSEncryptionFactory.svsSign(password, "password", True)
        response = createAccount(db, username, password, email, firstName, lastName, isLoggedIn)


    if(request == "whoAmI"):
        response = whoAmI(db, httprequest)

    if(username == "BLANK"):
        response = {"request": "FALSE" , "error": "USER IS NOT LOGGED IN."}
        raise Exception("YOU DONE GOOFED. NOT EVEN LOGGED IN BRO.")

    else:
        if(request == "editAccountInformation"):
            print("Account information: \n")
            print(accountInformation)
            oldPassword =  accountInformation['user']['oldPassword']
            newPassword = accountInformation['user']['newPassword']
            email = accountInformation['user']['email']
            firstName = accountInformation['user']['firstName']
            lastName = accountInformation['user']['lastName']
            response = editAccountInformation(db, username, email, oldPassword, newPassword, firstName, lastName)

        if(request == "getAccountInformation"):
            response = getAccountInformation(db, username)

        if(request == "logout"):
            response = logout(db, username, httprequest)


        if(request == "getCategory"):
            response = getCategory(db, "admin")

        if( request == "addCategory" or request == "deleteCategory" ):

            if(username == "admin"):
                if(request == "addCategory"):
                    response = addCategory(db, "admin", data['category'])

                if(request == "deleteCategory"):
                    response = deleteCategory(db, "admin", data['category'])
            else:
                print("YOU ARE NOT AN ADMIN #####.")
                raise Exception("YOU ARE NOT AN ADMIN.")

    return response


databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
