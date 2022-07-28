import scrapy

class UrlItem(scrapy.Item):
    websiteurl = scrapy.Field()
    title = scrapy.Field()
    description = scrapy.Field()
    name = scrapy.Field()
    numAccessed = scrapy.Field()
    sponsorPayment = scrapy.Field()
    dateCreated = scrapy.Field()
    
    