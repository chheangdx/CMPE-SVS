import urllib
import re

def crawl(thisurl):
	html_gunk = []
	if(re.match("^http://.*$", thisurl, re.I|re.M)):
		#re.I is case insensitive, re.M is ^$ matches start and end of line
		handle = urllib.urlopen(thisurl)
		html_gunk =  handle.read()
	else:
		print("Error: url is invalid")
	return html_gunk