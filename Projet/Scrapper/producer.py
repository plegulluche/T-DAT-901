import pika
import json
import random
import time

def load_articles(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def send_article(channel, article, queue):
    # Publishes a message to the specified queue
    # 'channel' is the channel instance
    # 'article' is the article data to be sent
    # 'queue' is the name of the queue where the message will be published
    channel.basic_publish(exchange='',
                          routing_key=queue,  # Use the provided queue name
                          body=json.dumps(article))
    try:
        print(f" [x] Sent to {queue}",flush=True)
    except Exception as e:
        print(f"An error occurred: {e}")


# Load articles from file
articles1 = load_articles('articles.json')
articles2 = load_articles('articles2.json')

# Establish a connection to RabbitMQ server
credentials = pika.PlainCredentials('user', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq', 5672, '/', credentials))

channel = connection.channel()

# Passing TTL arg to queues to persist the messages in the queue
args = {"x-message-ttl": 60000} 

# Declare a queue
channel.queue_delete(queue='articles')
channel.queue_delete(queue='articles2')
channel.queue_declare(queue='articles', arguments=args)
channel.queue_declare(queue='articles2', arguments=args)


while True:  # Infinite loop for continuous sending
    # Send articles from articles.json
    random.shuffle(articles1)
    for article in articles1:
        send_article(channel, article, 'articles')  # Specify 'articles' queue
        time.sleep(3)

    # Send articles from articles2.json
    random.shuffle(articles2)
    for article in articles2:
        send_article(channel, article, 'articles2')  # Specify 'articles2' queue
        time.sleep(3)



# Close the connection
# connection.close()
