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
    except Exception as e:
        print("Error sending message:", e)
