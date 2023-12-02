import pika
import json
import random
import time

def load_articles(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def send_article(channel, article):
    channel.basic_publish(exchange='',
                          routing_key='articles',
                          body=json.dumps(article))
    print(" [x] Sent article data: " + json.dumps(article))

# Load articles from file
articles = load_articles('articles.json')

# Establish a connection to RabbitMQ server
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='articles')

for _ in range(10):  # Repeat 10 times
    random.shuffle(articles)  # Randomize the order of articles
    for article in articles:
        send_article(channel, article)
    time.sleep(300)  # Pause for 5 minutes

# Close the connection
connection.close()
