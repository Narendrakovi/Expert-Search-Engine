from scrapy.spiders import CrawlSpider, Rule
from scrapy.linkextractors import LinkExtractor
from scrapy.exceptions import CloseSpider
from expertsearch_crawler.items import UrlItem
from tld import get_tld
import re
import datetime
import random

class ExpertSearchSpider(CrawlSpider):
    '''
    limit = 500
    count = 0
    '''
    name = 'my_spider'
    
    #allowed_domains = ['utdallas.edu']
    start_urls = ['https://moz.com/top500',]
    #urls = ['https://en.wikipedia.org/wiki/List_of_most_visited_websites', 'https://www.wikipedia.org/', 'https://www.cnn.com/', 'https://www.ign.com/', 'https://www.utdallas.edu/', 'https://www.aljazeera.com/', 'https://www.reddit.com/', 'https://moz.com/top500']
    #base_url = 'https://www.cnn.com/'
    rules = [Rule(LinkExtractor(), callback='parse_filter', follow=True)]

    def parse_filter(self, response):
        '''
        if (self.count >= self.limit):
            raise CloseSpider('limit exceed')
        self.count += 1
        '''
        reg = r"((https:\/\/)?|(http:\/\/)?)(www\.)?[a-zA-Z0-9]{2,256}\.(edu|com|org|net|gov)\/?$"
        if re.fullmatch(reg, response.url):
            
            temp = get_tld(response.url, as_object=True)
            '''
            temp = response.url
            leng = 4
            if temp.endswith('/'):
                leng = 5
            endidx = len(temp) - leng
            startidx = endidx - 1
            while startidx >= 0 and (temp[startidx] >= 'a' and temp[startidx] <= 'z' or temp[startidx] >= 'A' and temp[startidx] >= 'Z'):
                startidx -= 1
            startidx+=1
            response.url[startidx:endidx]
            '''

            url_item = UrlItem(websiteurl=response.url, title=response.css('head title::text').get(), description=response.css('head meta[name="description"]::attr(content)').get(), 
              name=temp.domain, numAccessed=0, sponsorPayment=round(random.uniform(0, 100000), 2), dateCreated=datetime.datetime.today())
            yield url_item
        
    
    

