CMPE SVS

Install Instructions:
Use Windows Powershell (Windows) or Terminal(Mac or Linux) using the following commands.
 If you are using Mac or Linux, use sudo. For example, sudo easy_install pymongo

1) Download and install version 3.5.2 of Python from https://www.python.org/
2) Confirm that Python is properly installed: 
	2.1) python --version
	2.2) easy_install --version
3) Install Django: easy_install Django==1.10.1 
	3.1) Check properly installed: django-admin --version
4) Install PyMongo: easy_install pymongo
5) Install Watson Developer Cloud: easy_install --upgrade watson-developer-cloud
6) Navigate to project folder
7) Run on local host: python manage.py runserver
8) URL should be: http://127.0.0.1:8000/

Required Packages:
	Python 3.5.2
	Django 1.10.1 
	pymongo
	--upgrade watson-developer-cloud
	
Additionally, download and install the below packages. Use "python setup.py build" and then "python setup.py install"
You might be able to use easy_install for installing below instead
PyCrypto (requires python 3.2 at least)
Simple Crypt