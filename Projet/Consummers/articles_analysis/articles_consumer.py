import json
import string
import re
import ccxt
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk


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
    nltk.download('punkt')
    nltk.download('stopwords')
    nltk.download('vader_lexicon')
    
    cryptocurrencies = fetch_cryptocurrencies()
    
    vader = SentimentIntensityAnalyzer()
    
    analysis_results = []
    first_articles = []
    crypto_sentiment_scores = {}

    with open('articles.json', 'r') as f:
        articles = json.load(f)
        for article in articles:
            crypto_found = find_crypto_in_article(article, cryptocurrencies)
            title = article['title']
            text = ' '.join(article['content'])
            score = vader.polarity_scores(text)
            
            sentiment = "Neutral"
            sentiment_value = 0
            if score['compound'] > 0.5:
                sentiment = "Positive"
                sentiment_value = 1
            elif score['compound'] < -0.5:
                sentiment = "Negative"
                sentiment_value = -1
            
            if crypto_found not in crypto_sentiment_scores:
                crypto_sentiment_scores[crypto_found] = sentiment_value
            else:
                crypto_sentiment_scores[crypto_found] += sentiment_value
            
            analysis_results.append({
                "title": title,
                "crypto": crypto_found,
                "sentiment": sentiment,
            })
            
            first_articles.append({
                "crypto": crypto_found,
                "sentiment": sentiment,
            })
    for crypto, score in crypto_sentiment_scores.items():
        if score == 0:
            crypto_sentiment_scores[crypto] = "Neutral"
        elif score >= 1:
            crypto_sentiment_scores[crypto] = "Positive"
        elif score <= -1:
            crypto_sentiment_scores[crypto] = "Negative"
    with open('articles_analysis.json', 'w') as outfile:
        json.dump(analysis_results, outfile, indent=4)
    print("Analysis results saved to articles_analysis.json\n")
    print("First Articles List:", first_articles)
    print("\nCrypto Sentiment Scores:", crypto_sentiment_scores)


if __name__ == "__main__":
    main()
