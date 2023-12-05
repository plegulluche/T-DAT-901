import scrapy
import json

class CryptoSpider(scrapy.Spider):
    name = 'crypto_1'
    start_urls = ['https://cryptonews.com/news/']
    
    def __init__(self, max_page=None, *args, **kwargs):
        super(CryptoSpider, self).__init__(*args, **kwargs)
        self.max_page = int(max_page) if max_page is not None else 1
        self.actual_page = 1
    
    def parse(self, response):
        articles = response.css('div[id^="post-"]')
        for article in articles:
            title = article.css('.article__title::text').get()
            link = article.css('h4 a::attr(href)').get()
            source = article.css('.article__badge--sm a::text').get()

            if link:
                yield scrapy.Request(url=link, callback=self.parse_article, meta={'title': title, 'link': link, 'source': source})

        next_page = response.css('div.pagination_main a.next::attr(href)').get()
        if self.actual_page < self.max_page:
            if next_page:
                self.actual_page = self.actual_page + 1
                yield scrapy.Request(url=next_page, callback=self.parse)

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

        # Write to news1.json
        with open('news1.json', 'a', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False)
            json_file.write('\n')

        yield data