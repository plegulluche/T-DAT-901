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

class CryptoSpider(scrapy.Spider):
    """
    A Scrapy Spider for scraping cryptocurrency news articles.

    Attributes:
        name (str): Name of the spider.
        start_urls (list): List of URLs where the spider will begin to crawl from.
        max_page (int): Maximum number of pages to scrape. Defaults to 1 if not provided.
        actual_page (int): Tracker for the current page number during scraping.
    """

    name = 'crypto'
    start_urls = ['https://cryptonews.com/news/']

    custom_settings = {
        'ROBOTSTXT_OBEY': False
    }

    def __init__(self, max_page=None, *args, **kwargs):
        """
        Initialize the spider. Removes the existing 'news1.json' file if it exists.

        Args:
            max_page (str, optional): Maximum number of pages to scrape. Defaults to None.
        """
        super(CryptoSpider, self).__init__(*args, **kwargs)
        self.max_page = int(max_page) if max_page is not None else 1
        self.actual_page = 1


    def start_requests(self):
        """
        Generator that yields the initial request to scrape the news site.

        Yields:
            scrapy.Request: The request object for the news site.
        """
        for url in self.start_urls:
            yield scrapy.Request(url, self.parse, cb_kwargs={'current_page': 1}, errback=self.errback_site_address)

    def parse(self, response, current_page):
        """
        Parses the main news page and yields requests for individual news articles.

        Args:
            response (scrapy.http.Response): The response object from the news site.
            current_page (int): The current page number being scraped.

        Yields:
            scrapy.Request: Requests for individual news articles.
        """
        articles = response.css('.col-lg-3.d-flex .news-one')
        for article in articles:
            title = article.css('.news-one-title a.article__title--md::text').get()
            link = article.css('a::attr(href)').get()
            source = article.css('.news-one-category::text').get()

            if link:
                yield scrapy.Request(
                    url=link,
                    callback=self.parse_article,
                    errback=self.errback_article_link,
                    meta={'title': title, 'link': link, 'source': source}
                )
            else:
                self.logger.error(f"Invalid article link found: {link}")

        next_page = response.css('div.pagination_main a.next::attr(href)').get()
        if current_page < self.max_page and next_page:
            yield scrapy.Request(url=next_page, callback=self.parse, cb_kwargs={'current_page': current_page + 1})

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
        raw_date = response.css('time::text').get()
        cleaned_date = " ".join(raw_date.strip().split()) if raw_date else None

        content_elements = response.css('.article-single__content p, .article-single__content h2 strong')

        content = []
        for element in content_elements:
            element_text = ''.join(element.css('*::text').getall()).strip()
            if "A quick 3min read about today's crypto news!" in element_text:
                continue
            if element_text:
                content.append(element_text)

        data = {
            'title': title,
            'source': source,
            'date': cleaned_date,
            'content': content,
        }

        send_to_kafka('news1', data)

        yield data
            
    def errback_site_address(self, failure):
        """
        Error callback function for handling failed requests due to incorrect site address.

        Args:
            failure (twisted.python.failure.Failure): The failure instance containing the error.
        """
        self.logger.error(f"Failed to request URL: {failure.request.url}")
        self.logger.error(f"Error: {repr(failure)}")  # Logs the representation of the failure

    def errback_article_link(self, failure):
        """
        Error callback function for handling failed requests for article links.

        Args:
            failure (twisted.python.failure.Failure): The failure instance containing the error.
        """
        self.logger.error(f"Request failed for article link: {failure.request.url}, Error: {failure.value}")
