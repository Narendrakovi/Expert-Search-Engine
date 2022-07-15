import scrapy

class UrlItem(scrapy.Item):
    websiteurl = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()
    numAccessed = scrapy.Field()
    sponserPayment = scrapy.Field()
    dateCreated = scrapy.Field()
    
    