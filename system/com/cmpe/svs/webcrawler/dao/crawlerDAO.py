#documentation found at
#https://docs.python.org/2/library/htmlparser.html

#mini tutorial found at
#http://www-rohan.sdsu.edu/~gawron/python_for_ss/course_core/book_draft/web/urllib.html

#imports for web parser
from htmlentitydefs import name2codepoint
import urllib
import HTMLParser

#regular expression validator
import re

#global variable for parser to use
urlText = []

#our parser
class MyHTMLParser(HTMLParser.HTMLParser):
	def handle_starttag(self, tag, attrs):
		print "Start tag:", tag
		for attr in attrs:
			print "     attr:", attr

	def handle_endtag(self, tag):
		print "End tag  :", tag

	def handle_data(self, data):
		print "Data     :", data

	def handle_comment(self, data):
		print "Comment  :", data

	def handle_entityref(self, name):
		c = unichr(name2codepoint[name])
		print "Named ent:", c

	def handle_charref(self, name):
		if name.startswith('x'):
			c = unichr(int(name[1:], 16))
		else:
			c = unichr(int(name))
		print "Num ent  :", c

	def handle_decl(self, data):
		print "Decl     :", data
        
#the crawler that is run by the service
def crawl(thisurl):
	print("Web Crawler: crawling initiated " + thisurl)
	if(re.match("^https?://.*$", thisurl, re.I|re.M)):
		#Create instance of HTML parser
		lParser = MyHTMLParser()
	
		#Feed HTML file into parser
		lParser.feed(urllib.urlopen(thisurl).read())
		lParser.close()
	
		print("Web Crawler: completed")
	else:
		print("Error: web crawling url is invalid")
	return urlText