import scrapy
import json
import os

class CryptoSpider(scrapy.Spider):
    name = 'crypto_1'
    start_urls = ['https://cryptonews.com/news/']

    def __init__(self, max_page=None, *args, **kwargs):
        super(CryptoSpider, self).__init__(*args, **kwargs)
        self.max_page = int(max_page) if max_page is not None else 1
        self.actual_page = 1

        if os.path.exists('news1.json'):
            os.remove('news1.json')
    
    def start_requests(self):
        url = 'https://cryptonews.com/news/'
        yield scrapy.Request(url, self.parse, cb_kwargs={'current_page': 1})

    def parse(self, response, current_page):
        articles = response.css('div[id^="post-"]')
        for article in articles:
            title = article.css('.article__title::text').get()
            link = article.css('h4 a::attr(href)').get()
            source = article.css('.article__badge--sm a::text').get()

            if link:
                yield scrapy.Request(url=link, callback=self.parse_article, meta={'title': title, 'link': link, 'source': source})

        next_page = response.css('div.pagination_main a.next::attr(href)').get()
        if current_page < self.max_page and next_page:
            yield scrapy.Request(url=next_page, callback=self.parse, cb_kwargs={'current_page': current_page + 1})

    def parse_article(self, response):
        title = response.meta['title']
        source = response.meta['source']
        raw_date = response.css('time::text').get()
        content = response.css('.article-single__content p::text').getall()

        cleaned_date = " ".join(raw_date.strip().split())

        data = {
            'title': title,
            'source': source,
            'date': cleaned_date,
            'content': content,
        }

        with open('news1.json', 'a', encoding='utf-8') as json_file:
            if os.path.getsize('news1.json') == 0:
                json_file.write('[')
            else:
                json_file.write(',')

            json.dump(data, json_file, ensure_ascii=False, indent=2)
            json_file.write('\n')

        yield data

    def closed(self, reason):
        with open('news1.json', 'a', encoding='utf-8') as json_file:
            json_file.write(']')