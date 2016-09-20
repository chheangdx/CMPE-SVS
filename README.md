CMPE SVS

The Computer Engineering Smart Visitor System is a web and mobile application that focuses on reducing student wait times through smart Q&A. This system implements cognitive learning using IBM Watson’s Retrieve and Rank API, which evaluates natural language search queries to resolve students’ concerns. Additional features of this system are linked through MongoDB for fast content updates to provide schedule handling and assistive document preparation. Students may schedule visits ahead of time, which populate a live list that the office views. They are notified of what documents they need to fill out and bring to their visit.

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
