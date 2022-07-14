from gc import collect
import pymongo
from itemadapter import ItemAdapter
import sys
from expertsearch_crawler.items import UrlItem
# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface


class MongoDBPipeline:

    def __init__(self, mongo_uri, mongo_db, mongo_collect):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.mongo_collect = mongo_collect
        if not self.mongo_uri: sys.exit("You need to provide a Connection String.")

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri = crawler.settings.get("MONGO_URI"),
            mongo_db = crawler.settings.get("MONGO_DATABASE", "test"),
            mongo_collect = crawler.settings.get("MONOGO_COLLECT", "testtb"),
        ) 

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        self.collection = self.db[self.mongo_collect]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        #item_dict = ItemAdapter(item).asdict()
        item_dict = dict(UrlItem(item))
        query = {"websiteurl": item_dict["websiteurl"]}
        if self.collection.find(query).count() == 0:
            self.collection.insert_one(item_dict)
        return item