from confluent_kafka import Consumer, KafkaError

class KafkaConsumerService:
    def __init__(self, topics):
        self.consumer = Consumer({
            'bootstrap.servers': 'kafka:9092',
            'group.id': 'my-group',
            'auto.offset.reset': 'earliest'
        })
        self.topics = topics

    def consume_messages(self):
        self.consumer.subscribe(self.topics)

        try:
            while True:
                msg = self.consumer.poll(1.0)  # Poll for messages
                if msg is None:
                    continue
                if msg.error():
                    if msg.error().code() == KafkaError._PARTITION_EOF:
                        # End of partition event
                        continue
                    else:
                        print(msg.error())
                        break
                print(f'Received message: {msg.value().decode("utf-8")}')
        except KeyboardInterrupt:
            pass
        finally:
            self.consumer.close()

    def start_consuming(self):
        # This method is intended to be run in a background task
        self.consume_messages()
