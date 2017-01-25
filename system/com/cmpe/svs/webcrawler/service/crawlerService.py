from ..dao import simpleCrawlDAO
from ..dao import parseTextDAO
import json

def simpleCrawl(thisurl):
	return json.dumps(simpleCrawlDAO.crawl(thisurl))
	
def parseText(thisurl):
	return json.dumps(parseTextDAO.crawl(thisurl))