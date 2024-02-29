import json
import string
from kafka import KafkaConsumer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
from datetime import datetime, timezone
import pytz
import requests

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
    url = "https://api.coingecko.com/api/v3/coins/list"
    response = requests.get(url)
    data = response.json()

    crypto_mapping = {}
    for coin in data:
        crypto_mapping[coin['name']] = coin['symbol'].upper()
    crypto_mapping = {k: v for k, v in crypto_mapping.items() if 'block' not in k.lower() and 'rate' not in k.lower()}
    return crypto_mapping

def preprocess_text(text):
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    return tokens

def find_crypto_in_article(article, crypto_mapping):
    searchable_text = preprocess_text(article['title'] + ' ' + ' '.join(article['content']))
    crypto_counts = {name: 0 for name in crypto_mapping.keys()}
    
    for word in searchable_text:
        for name, token in crypto_mapping.items():
            if word.upper() == name.upper():
                crypto_counts[name] += 1

    if max(crypto_counts.values()) > 0:
        primary_crypto_name = max(crypto_counts, key=crypto_counts.get)
        return crypto_mapping[primary_crypto_name].upper()
    else:
        return "Unknown"

def main():
    i = 0
    print("Fetching cryptocurrencies...")
    cryptocurrencies = fetch_cryptocurrencies()
    print("sentiment analysis...")
    vader = SentimentIntensityAnalyzer()
    f = open("articles.json", "r")
    all_articles = []
    crypto_sentiment_scores = {}
    articles = json.load(f)
    print("Consuming messages from topics...")
    try:
        for message in articles:
            print("Topics == ", message.topic)
            article = message.value
            crypto_found = find_crypto_in_article(article, cryptocurrencies)
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
                "score": score['compound'],
            })        
    except StopIteration:
        print("No more messages. Exiting...")
    finally:
        consumer.close()

    print("Aggregating sentiment scores...")
    final_scores = {}
    for crypto, entries in crypto_sentiment_scores.items():
        for entry in entries:
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

    print("Saving results to json files...")
    with open('first_articles.json', 'w') as outfile:
        json.dump(all_articles, outfile, indent=4)
    print("First articles saved to all_articles.json")

    with open('crypto_sentiment_scores.json', 'w') as outfile:
        json.dump(final_scores, outfile, indent=4)
    print("Crypto sentiment scores saved to crypto_sentiment_scores.json")

if __name__ == "__main__":
    main()
