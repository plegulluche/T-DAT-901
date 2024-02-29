from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from .services.historical_data_service import cache_crypto_data
from .core.database import create_tables
from .services.kafka_consumer import KafkaConsumerService
from .api import routers
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from datetime import datetime
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()



cryptocurrencies = ['BTC', 'USDT', 'ETH', 'SOL', 'XRP', 'AVAX', 'TRX', 'OP', 'LINK', 'ADA']

topics = [f"{item}_price" for item in cryptocurrencies]
# Dictionary to map items to their WebSocket clients


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.websocket("/ws/BTC")
async def websocket_btc_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for BTC")
    btc_kafka_consumer_service = KafkaConsumerService(topic="BTC_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    btc_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await btc_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")


@app.websocket("/ws/ETH")
async def websocket_eth_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for ETH")
    eth_kafka_consumer_service = KafkaConsumerService(topic="ETH_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    eth_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await eth_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/USDT")
async def websocket_usdt_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for USDT")
    usdt_kafka_consumer_service = KafkaConsumerService(topic="USDT_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    usdt_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await usdt_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/SOL")
async def websocket_sol_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for SOL")
    sol_kafka_consumer_service = KafkaConsumerService(topic="SOL_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    sol_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await sol_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/XRP")
async def websocket_xrp_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for XRP")
    xrp_kafka_consumer_service = KafkaConsumerService(topic="XRP_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    xrp_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await xrp_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/AVAX")
async def websocket_avax_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for AVAX")
    avax_kafka_consumer_service = KafkaConsumerService(topic="AVAX_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    avax_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await avax_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/TRX")
async def websocket_trx_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for TRX")
    trx_kafka_consumer_service = KafkaConsumerService(topic="TRX_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    trx_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await trx_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/OP")
async def websocket_op_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for OP")
    op_kafka_consumer_service = KafkaConsumerService(topic="OP_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    op_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await op_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")


@app.websocket("/ws/LINK")
async def websocket_link_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for LINK")
    link_kafka_consumer_service = KafkaConsumerService(topic="LINK_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    link_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await link_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

@app.websocket("/ws/ADA")
async def websocket_ada_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection accepted for ADA")
    ada_kafka_consumer_service = KafkaConsumerService(topic="ADA_price")
    
    # Pass the current event loop to the Kafka consumer service
    loop = asyncio.get_running_loop()
    ada_kafka_consumer_service.start_consuming(loop)

    try:
        while True:
            message = await ada_kafka_consumer_service.messages_queue.get()
            await websocket.send_text(message)
    except WebSocketDisconnect:
        logger.info("WebSocket connection was closed by the client.")
    except Exception as e:
        logger.error(f"Unexpected error: {e}")

async def startup():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logger.info(f"Server is starting up at {current_time}...")
    # Create database tables
    await create_tables()
    await cache_crypto_data()
 

app.add_event_handler("startup", startup)


# Include the API router from routers.py, which includes all routes from crypto.py
app.include_router(routers.router, prefix="/api")


