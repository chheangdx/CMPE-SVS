CMPE SVS

Install Instructions: <br />
Use Windows Powershell (Windows) or Terminal(Mac or Linux) using the following commands.
 If you are using Mac or Linux, use sudo. For example, sudo easy_install pymongo <br /><br />

1) Download and install version 3.5.2 of Python from https://www.python.org/ <br />
2) Confirm that Python is properly installed: <br />
	2.1) python --version<br />
	2.2) easy_install --version<br />
3) Install Django: easy_install Django==1.10.1 <br />
	3.1) Check properly installed: django-admin --version <br />
4) Install PyMongo: easy_install pymongo <br />
5) Install Watson Developer Cloud: easy_install --upgrade watson-developer-cloud <br />
6) Navigate to project folder <br />
7) Run on local host: python manage.py runserver <br />
8) URL should be: http://127.0.0.1:8000/ <br />


Description: This is done in screenshot1. <br />
1) Hello World is first loaded through Django using the URL pattern linked to the "index" controller <br />
2) Django greets the user and gives a form to place the user's name <br />
3) AngularJS will make a HTTP POST request to the server using the name input upon clicking a button in the window <br />
4) The URL pattern used for the request is linked to the "hello" controller in Django. The request is parsed and then inserted into MongoDB <br />
5) The data is retrieved from MongoDB and placed into the context <br />
6) A Django template is loaded and populated with the new data <br />
7) The template is rendered and returned as a HTTP response, of which AngularJS will inject into the webpage's body <br />
<br /> <br />

Screenshot 2 shows that Watson can be given a question and return an answer. This is not yet integrated with 
the rest of the code as sending the request from Python still needs to be figured out. Watson also is not trained 
yet to fully respond to answers. Watson needs a collection of hand written answers before being able to properly 
answer questions.


Required Packages: <br />
Python 3.5.2<br />
Django 1.10.1 <br />
pymongo <br />
watson-developer-cloud <br />

Additionally, download and install the below packages. Use "python setup.py build" and then "python setup.py install"<br/>
PyCrypto (requires python 3.2 at least) <br />
Simple Crypt <br />