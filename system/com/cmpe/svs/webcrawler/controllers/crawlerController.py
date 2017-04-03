from ..service import crawlerService 

def simpleCrawl(thisurl):
	print("Crawler Controller: Simple Crawl initiated")
	return crawlerService.simpleCrawl(thisurl)
	
#def parseText(thisurl):
#	print("Crawler Controller: Parse Text initiated")
#	return crawlerService.parseText(thisurl)
	
#def crawl(thisurl):
#	print("Crawler Controller: Web Crawling initiated")
#	return crawlerService.crawl(thisurl)