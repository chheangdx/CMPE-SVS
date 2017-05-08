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
            if (accountInformation['password'] == password):
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
        


def setPassword(db, username, password):
    accountInformation = db.find_one({"username": username})
    accountInformation['password'] = password
    db.save(accountInformation)
    print("Account Editing Success: Password changed.")
    

def setEmail(db, username, email):
    accountInformation = db.find_one({"username": username})
    accountInformation['email'] = email
    db.save(accountInformation)
    print("Account Editing Success: Emailed changed.")


def setFirstName(db, username, firstName):
    accountInformation = db.find_one({"username": username})
    accountInformation['firstName'] = firstName
    db.save(accountInformation)
    print("Account Editing Success: First name changed.")

def setLastName(db, username, lastName):
    accountInformation = db.find_one({"username": username})
    accountInformation['lastName'] = lastName
    db.save(accountInformation)
    print("Account Editing Success: Last name changed.")

def getEmail(db, username):
    accountInformation = db.find_one({"username": username})
    return accountInformation['email']

def getPassword(db, username):
    accountInformation = db.find_one({"username": username})
    return accountInformation['password']

def getFirstName(db, username):
    accountInformation = db.find_one({"username": username})
    return accountInformation['firstName']

def getLastName(db, username):
    accountInformation = db.find_one({"username": username})
    return accountInformation['lastName']

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


 

    if(username == "BLANK"):
        response = {"request": "FALSE" , "error": "USER IS NOT LOGGED IN."}
        raise Exception("YOU DONE GOOFED. NOT EVEN LOGGED IN BRO.")
    else:
        if(request == "logout"):
            username = username.lower()
            response = logout(db, username, httprequest)


        if(request == "addCategory"):
            response = addCategory(db, username, data['category'])

        if(request == "deleteCategory"):
            response = deleteCategory(db, username, data['category'])

        if(request == "getCategory"):
            response = getCategory(db, username)

    return response


databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
