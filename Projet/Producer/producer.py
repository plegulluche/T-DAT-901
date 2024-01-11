from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from producer.spiders.crypto_news1 import CryptoSpider
from producer.spiders.crypto_news2 import CryptoNewsSpider
from producer.spiders.crypto_news3 import CryptoBlockSpider
import sys

def main():
    if len(sys.argv) != 2:
        print("Usage: python test.py <max_page>")
        sys.exit(1)

    try:
        max_page = int(sys.argv[1])
    except:
        print("Usage: python test.py <max_page>")
        sys.exit(1)

    settings = get_project_settings()

    process = CrawlerProcess(settings)

    spider_args = {'max_page': max_page}

    process.crawl(CryptoSpider, **spider_args)

    process.crawl(CryptoNewsSpider)
    
    process.crawl(CryptoBlockSpider)

    process.start()

if __name__ == "__main__":
    main()
