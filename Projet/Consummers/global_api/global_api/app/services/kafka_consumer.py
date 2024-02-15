from aiokafka import AIOKafkaConsumer
# from main import active_websockets

# async def broadcast_message(message: str):
#     disconnected_sockets = []
#     for websocket in active_websockets:
#         try:
#             await websocket.send_text(message)
#         except Exception:
#             disconnected_sockets.append(websocket)
    
#     for websocket in disconnected_sockets:
#         await disconnect_websocket(websocket)

async def consume():
    consumer = AIOKafkaConsumer(
        'BTC_price', 'ETH_price', 'SOL_price',
        bootstrap_servers='kafka:9092',
        group_id="crypto-reader")

    await consumer.start()
    try:
        async for msg in consumer:
            # Check if the message is from the 'BTC_price' topic
            if msg.topic == 'BTC_price':
                print(f"Received message from {msg.topic}: {msg.value.decode('utf-8')}")
            decoded_msg = msg.value.decode('utf-8')
            # await broadcast_message(decoded_msg)
    finally:
        await consumer.stop()

