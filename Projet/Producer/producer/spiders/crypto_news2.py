import scrapy
import json
import os

class CryptoNewsSpider(scrapy.Spider):
    name = 'crypto_news'
    start_urls = ['https://crypto.news/news/']

    if os.path.exists('news2.json'):
        os.remove('news2.json')

    def parse(self, response):
        articles = response.css('.post-loop--category-news')

        for article in articles:
            title = article.css('.post-loop__title a::text').get()
            source = article.css('.post-loop__media-link::attr(href)').get()
            date = article.css('.post-loop__date::text').get()
            article_link = article.css('.post-loop__title a::attr(href)').get()

            yield scrapy.Request(article_link, callback=self.parse_article, meta={'title': title, 'source': source, 'date': date, 'article_link': article_link})

    def parse_article(self, response):
        title = response.meta['title']
        source = response.meta['source']
        date = response.meta['date']
        content = response.css('.post-detail__container p::text').getall()
        article_link = response.meta['article_link']

        data = {
            'title': title,
            'source': source,
            'date': date,
            'content': content,
            'article_link': article_link
        }

        with open('news2.json', 'a', encoding='utf-8') as json_file:
            if os.path.getsize('news2.json') == 0:
                json_file.write('[')
            else:
                json_file.write(',')

            json.dump(data, json_file, ensure_ascii=False, indent=2)
            json_file.write('\n')

        yield data

    def closed(self, reason):
        with open('news2.json', 'a', encoding='utf-8') as json_file:
            json_file.write(']')