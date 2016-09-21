CMPE SVS

Install Instructions: <br />
1) Download and install latest version of Python <br />
	1.1) Check properly installed: python --version <br />
	1.2) Check properly installed: pip --version <br />
2) Run Windows Powershell as admin for next steps <br />
3) Install Django: pip install Django==1.10.1 <br />
	3.1) Check properly installed: django-admin --version <br />
4) Install PyMongo: easy_install pymongo <br />
5) Navigate to project folder <br />
6) Run on local host: python manage.py runserver <br />
7) URL should be: http://127.0.0.1:8000/ <br />

Description: <br />
Hello World is first loaded through Django using the URL pattern linked to the "index" controller. 
You are greeted by Django and given a form to place your name. When you click the button, 
AngularJS will make a HTTP POST request to the server using your input. The URL pattern used for the request 
is linked to the "hello" controller in Django. The request is parsed and handled by the 3 different databases. 
A Django template is loaded and populated and the new data.  
The template is rendered and returned as a HTTP response, of which AngularJS will inject into the webpage's body.