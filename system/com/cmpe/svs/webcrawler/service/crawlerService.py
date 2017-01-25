from ..dao import simpleCrawlDAO
from ..dao import parseTextDAO
from ..dao import crawlerDAO
import json

def simpleCrawl(thisurl):
	return json.dumps(simpleCrawlDAO.crawl(thisurl))
	
def parseText(thisurl):
	return json.dumps(parseTextDAO.crawl(thisurl))
	
def crawl(thisurl):
	return json.dumps(crawlerDAO.crawl(thisurl))