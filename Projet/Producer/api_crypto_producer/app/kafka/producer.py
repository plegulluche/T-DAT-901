from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['kafka:9093'],
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    key_serializer=lambda v: json.dumps(v).encode('utf8')
)

def send_to_kafka(topic, message):
    print("DEBUG PRODUCER : Sending message to topic", topic)
    future = producer.send(topic, message)
    try:
        record_metadata = future.get(timeout=10)
        print("Message sent to topic:", record_metadata.topic)
        print("Partition:", record_metadata.partition)
        print("Offset:", record_metadata.offset)
    except Exception as e:
        print("Error sending message:", e)
