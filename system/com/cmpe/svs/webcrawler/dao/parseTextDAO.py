import urllib
from html.parser import HTMLParser
import re

#Define HTML Parser
urlText=[]
class parseText(HTMLParser):
        
    def handle_data(self, data):
        if data != '\n':
            urlText.append(data)
            
def crawl(thisurl):
	print("Parse Text: crawling initiated " + thisurl)
	if(re.match("^https?://.*$", thisurl, re.I|re.M)):
		#Create instance of HTML parser
		lParser = parseText()
	
		#Feed HTML file into parser
		lParser.feed(urllib.urlopen(thisurl).read())
		lParser.close()
	
		print("Parse Text: completed")
	else:
		print("Error: url is invalid")
	return urlText