import scrapy
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['kafka:9092'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    key_serializer=lambda v: json.dumps(v).encode('utf8')
)

def send_to_kafka(topic, message):
    future = producer.send(topic, message)
    try:
        record_metadata = future.get(timeout=10)
        print("Message sent to topic:", record_metadata.topic)
        print("Partition:", record_metadata.partition)
        print("Offset:", record_metadata.offset)
    except Exception as e:
        print("Error sending message:", e)

class CryptoNewsSpider(scrapy.Spider):
    """
    A Scrapy Spider for scraping cryptocurrency news articles from crypto.news.

    Attributes:
        name (str): Name of the spider.
        start_urls (list): List of URLs where the spider will begin to crawl from.
    """

    name = 'cryptonews'
    start_urls = ['https://crypto.news/news/']

    custom_settings = {
        'ROBOTSTXT_OBEY': False
    }

        
    def start_requests(self):
        """
        Generator that yields the initial request to scrape the news site.

        Yields:
            scrapy.Request: The request object for the news site.
        """
        for url in self.start_urls:
            yield scrapy.Request(url, self.parse, errback=self.errback_site_address)

    def parse(self, response):
        """
        Parses the main news page and yields requests for individual news articles.

        Args:
            response (scrapy.http.Response): The response object from the news site.

        Yields:
            scrapy.Request: Requests for individual news articles with their metadata.
        """
        articles = response.css('.post-loop--category-news')

        for article in articles:
            title = article.css('.post-loop__title a::text').get()
            source = article.css('.post-loop__media-link::attr(href)').get()
            article_link = article.css('.post-loop__title a::attr(href)').get()

            if article_link:
                yield scrapy.Request(
                    article_link, 
                    callback=self.parse_article, 
                    errback=self.errback_article_link, 
                    meta={'title': title, 'source': source, 'article_link': article_link}
                )
            else:
                self.logger.error(f"Invalid article link found: {article_link}")

    def parse_article(self, response):
        """
        Parses individual article pages to extract and store article details.

        Args:
            response (scrapy.http.Response): The response object from the article page.

        Yields:
            dict: A dictionary containing the scraped data of the article.
        """
        title = response.meta['title']
        source = response.meta['source']
        content_elements = response.css('.post-detail__content p, .post-detail__content h2')

        content = []
        for element in content_elements:
            element_text = ''.join(element.css('*::text').getall()).strip()
            if element_text:
                content.append(element_text)

        raw_date = response.css('time::text').get()
        cleaned_date = " ".join(raw_date.strip().split())

        data = {
            'title': title,
            'source': source,
            'date': cleaned_date,
            'content': content,
        }

        send_to_kafka('news2', data)

        # with open('news2.json', 'a', encoding='utf-8') as json_file:
        #     if os.path.getsize('news2.json') == 0:
        #         json_file.write('[')
        #     else:
        #         json_file.write(',')

        #     json.dump(data, json_file, ensure_ascii=False, indent=2)
        #     json_file.write('\n')

        yield data

    def errback_site_address(self, failure):
        """
        Error callback function for handling failed requests due to incorrect site address.

        Args:
            failure (twisted.python.failure.Failure): The failure instance containing the error.
        """
        self.logger.error(f"Request failed for site address: {failure.request.url}, Error: {failure.value}")

    def errback_article_link(self, failure):
        """
        Error callback function for handling failed requests for article links.

        Args:
            failure (twisted.python.failure.Failure): The failure instance containing the error.
        """
        self.logger.error(f"Request failed for article link: {failure.request.url}, Error: {failure.value}")

