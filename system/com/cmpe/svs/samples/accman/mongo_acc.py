from __future__ import unicode_literals, absolute_import, print_function
import pymongo
from pymongo import MongoClient

def task(env, action):
    
    #creating a database instance variable 
    db = get_db()
    print (action)
    
    if action=="insert":
        insert_data(db)
    elif action=="retrieve":
        return retrieve_data(db)
    else:
        print("No actions were provided from the AngularJS Code")
        
def get_db():   
    print("Get DB function is running...")
    #Client will be holding mongo client data
    client = MongoClient('aws-us-east-1-portal.17.dblayer.com', 15319)
			
    #alert the user that theyre unable to connect to the Database        
    if not client:
        print("MongoDB Error: Could not connect to DB.")
        return None 
    
    #creating a database object instance
    db = client['TestDB'] #name of the database
    
    #gaining access to the database via the username and password provided above
    db.authenticate('richard', 'richardrichard', mechanism = 'SCRAM-SHA-1')
    
    return db

def insert_data(db, val): #this function will find hello world in the database and return it in a list format.  
    print("insert data function is running...")
    db.testdata.insert({"title": "Hello from MongoDB, " + val + "!"}) #this will insert the string "hello world" into the mongo DB database.

#The following two functions are used for insertion and retrieval	
def retrieve_data(db, val): #this function will find hello world in the database and return it in a list format. 
    print("retrieve data function is running...")
    return db.testdata.find({"title": "Hello from MongoDB, " + val + "!"})