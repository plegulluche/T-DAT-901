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
articles1 = load_articles('articles.json')
articles2 = load_articles('articles2.json')

# Establish a connection to RabbitMQ server
credentials = pika.PlainCredentials('user', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq', 5672, '/', credentials))

channel = connection.channel()

# Declare a queue
channel.queue_declare(queue='articles')
channel.queue_declare(queue='articles2')


while True:  # Infinite loop for continuous sending
    # Send articles from articles.json
    random.shuffle(articles1)
    for article in articles1:
        send_article(channel, article)
        time.sleep(3)  # Adjust the delay as needed

    # Send articles from articles2.json
    random.shuffle(articles2)
    for article in articles2:
        send_article(channel, article, queue='articles2')  # Assuming modified send_article to accept queue name
        time.sleep(3)  # Adjust the delay as needed

# Close the connection
# connection.close()
