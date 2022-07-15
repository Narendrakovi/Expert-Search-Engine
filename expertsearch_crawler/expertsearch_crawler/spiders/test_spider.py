from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
from expertsearch_crawler.items import UrlItem
import re
import datetime

class ExpertSearchSpider(CrawlSpider):
    #limit = 500
    #count = 0
    name = 'my_spider'
    #allowed_domains = ['utdallas.edu']
    start_urls = ['https://www.cnn.com/']
    #base_url = 'https://utdallas.edu'
    rules = [Rule(LinkExtractor(), callback='parse_filter', follow=True)]

    def parse_filter(self, response):
        #if (self.count >= self.limit):
        #    raise CloseSpider('limit exceed')
        #self.count += 1
        reg = r"((https:\/\/)?|(http:\/\/)?)[(www\.)?a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
        if re.fullmatch(reg, response.url):
            url_item = UrlItem(websiteurl=response.url, title=response.css('head title::text').get(), description=response.css('head meta[name="description"]::attr(content)').get(), 
            numAccessed=0, sponserPayment=0, dateCreated=datetime.datetime.today())
            yield url_item
        
    
    

