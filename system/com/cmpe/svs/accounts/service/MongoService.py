import pymongo
from pymongo import MongoClient
import json
from ...utility import SVSSessionFactory

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
        response = createAccount(db, username, password, email, firstName, lastName, isLoggedIn)
    
    if(request == "logout"):
        username = accountInformation['user']['username']
        username = username.lower()
        response = logout(db, username, httprequest)



    return response


databaseName = 'TestDB'
db = connectToMongoDB(databaseName)
