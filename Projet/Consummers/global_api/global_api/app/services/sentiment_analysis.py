import json
import string
import re
import ccxt
from kafka import KafkaConsumer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from datetime import datetime, timezone, timedelta
import pytz

nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('stopwords')

topics = ['news1', 'news2', 'news3']

consumer = KafkaConsumer(
        *topics,
        bootstrap_servers=['kafka:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='news-reader-test-seven',
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        consumer_timeout_ms=5000
)

def get_current_date_est():
    eastern = pytz.timezone('US/Eastern')
    
    current_time_utc = datetime.now(timezone.utc)
    current_time_est = current_time_utc.astimezone(eastern)
    
    formatted_date = current_time_est.strftime("%B %d, %Y %H:%M EST")
    return formatted_date

def fetch_cryptocurrencies():
    exchange = ccxt.binance()
    markets = exchange.load_markets()
    crypto_names = set()
    for symbol in markets.keys():
        base, _ = symbol.split('/')
        crypto_names.add(base)
    return crypto_names

def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return tokens

def find_crypto_in_article(article, crypto_names):
    searchable_text = preprocess_text(article['title'] + ' ' + ' '.join(article['content']))
    crypto_counts = {crypto: 0 for crypto in crypto_names}

    for word in searchable_text:
        if word.upper() in crypto_counts:
            crypto_counts[word.upper()] += 1

    primary_crypto = max(crypto_counts, key=crypto_counts.get)
    
    if crypto_counts[primary_crypto] > 0:
        return primary_crypto
    else:
        return "Unknown"

def main():
    i = 0
    print("Fetching cryptocurrencies...")
    cryptocurrencies = fetch_cryptocurrencies()
    print("sentiment analysis...")
    vader = SentimentIntensityAnalyzer()
    
    all_articles = []
    crypto_sentiment_scores = {}

    print("Consuming messages from topics...")
    try:
        for message in consumer:
            print(f"Consumed message: {message.value}")
            print("Topics == ", message.topic)
            article = message.value
            crypto_found = find_crypto_in_article(article, cryptocurrencies)
            print(f"Crypto found: {crypto_found}")
            date = article.get('date', 'Unknown Date')
            text = ' '.join(article['content'])
            score = vader.polarity_scores(text)
        
            sentiment = "Neutral"
            if score['compound'] > 0.5:
                sentiment = "Positive"
            elif score['compound'] < -0.5:
                sentiment = "Negative"
            if not date or date == 'Unknown Date':
                date = get_current_date_est()
            if crypto_found not in crypto_sentiment_scores:
                crypto_sentiment_scores[crypto_found] = [{'date': date, 'sentiment': sentiment}]
            else:
                crypto_sentiment_scores[crypto_found].append({'date': date, 'sentiment': sentiment})
            print('Article:', i)
            i += 1
            all_articles.append({
                "date": date,
                "crypto": crypto_found,
                "sentiment": sentiment,
            })        
    except StopIteration:
        print("No more messages. Exiting...")
    finally:
        consumer.close()

    print("Aggregating sentiment scores...")
    final_scores = {}
    for crypto, entries in crypto_sentiment_scores.items():
        for entry in entries:
            print('FINAL SCORES : ', final_scores)
            sentiment_score = 0
            if entry['sentiment'] == "Positive":
                sentiment_score = 1
            elif entry['sentiment'] == "Negative":
                sentiment_score = -1
            if crypto not in final_scores:
                final_scores[crypto] = {'date': entry['date'], 'crypto': crypto, 'sentiment': entry['sentiment']}
            else:
                if sentiment_score > 0 and final_scores[crypto]['sentiment'] != "Positive":
                    final_scores[crypto] = {'date': entry['date'], 'crypto': crypto, 'sentiment': entry['sentiment']}
                elif sentiment_score < 0 and final_scores[crypto]['sentiment'] != "Negative":
                    final_scores[crypto] = {'date': entry['date'], 'crypto': crypto, 'sentiment': entry['sentiment']}

    return  {"sentiment_scores": final_scores}
