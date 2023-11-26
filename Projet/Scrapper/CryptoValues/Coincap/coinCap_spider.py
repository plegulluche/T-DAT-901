import scrapy

class CoinCapSpider(scrapy.Spider):
    name = "coincap"
    start_urls = [
        'https://coincap.io/',
    ]

def parse(self, response):

    yield {
        'Polygon': polygon.value,
        'Cardano': cardano.value,
        'Tether': tether.value
    }