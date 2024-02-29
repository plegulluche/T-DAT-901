from confluent_kafka import Consumer, KafkaError
import asyncio
import threading
import logging

logger = logging.getLogger(__name__)

class KafkaConsumerService:
    def __init__(self, topic):
        self.consumer = Consumer({
            'bootstrap.servers': 'kafka:9092',
            'group.id': 'api-consumer',
            'auto.offset.reset': 'earliest'
        })
        self.topic = topic
        self.messages_queue = asyncio.Queue()

    def start_consuming(self, loop):
        # Accept the event loop from the main thread
        def run():
            self.consumer.subscribe([self.topic])
            try:
                while True:
                    message = self.consumer.poll(1.0)
                    if message is None:
                        continue
                    if message.error() and message.error().code() != KafkaError._PARTITION_EOF:
                        logger.error(message.error())
                        continue
                    asyncio.run_coroutine_threadsafe(self.messages_queue.put(message.value().decode('utf-8')), loop)
            finally:
                self.consumer.close()

        threading.Thread(target=run, daemon=True).start()
