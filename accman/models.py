from mongoengine import *

# Create your models here.
class User(Document):
	username = StringField(max_length=32, required=True)
	password = StringField(max_length=32, require=True)
		
class Profile(Document):
	email = StringField(max_length=32, required=True)
	studentid = StringField(max_length=10, required=True)
	
	def getEmail(self):
		return self.email
	def getStudentID(self):
		return self.studentid