import pika
import time

def callback(ch, method, properties, body):
    # This is the callback function that gets called when a message is received.
    # 'ch' is the channel instance
    # 'method' contains method frame with routing_key, which tells us the queue name
    # 'properties' are the properties set when the message was sent (not used here)
    # 'body' is the actual message content
    # print(f"Received from {method.routing_key}: {body}")
    print(f"A new message has been posted on {method.routing_key} queue", flush=True)
    # time.sleep(3)  # Log every 3 seconds to avoid flooding

# Establish a connection to RabbitMQ server
credentials = pika.PlainCredentials('user', 'password')
connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq', 5672, '/', credentials))

channel = connection.channel()

args = {"x-message-ttl": 60000}

# Declare queues that this consumer will listen to
channel.queue_delete(queue='articles')
channel.queue_delete(queue='articles2')
channel.queue_declare(queue='articles',arguments=args)
channel.queue_declare(queue='articles2',arguments=args)

# Set up consumption from both queues
# The 'callback' function is registered here to be called whenever a message is received
channel.basic_consume(queue='articles', on_message_callback=callback, auto_ack=True)
channel.basic_consume(queue='articles2', on_message_callback=callback, auto_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()  # Start listening for messages

# Checking mount update
# Another update