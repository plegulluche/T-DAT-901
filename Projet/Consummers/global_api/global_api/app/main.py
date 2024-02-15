from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import Set
from contextlib import asynccontextmanager
import asyncio

# Import the consume function from your Kafka consumer module
from services.kafka_consumer import consume

# Maintain a set of active WebSocket connections
active_websockets: Set[WebSocket] = set()

async def connect_websocket(websocket: WebSocket):
    await websocket.accept()
    active_websockets.add(websocket)

async def disconnect_websocket(websocket: WebSocket):
    active_websockets.remove(websocket)

@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # Startup code here
    task = asyncio.create_task(consume())
    yield  # Yield control back to FastAPI until shutdown
    # Shutdown code here
    task.cancel()  # Example of how to cancel a background task on shutdown
    await asyncio.gather(task, return_exceptions=True)

app = FastAPI(lifespan=app_lifespan)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await connect_websocket(websocket)
    try:
        while True:
            # The loop keeps the WebSocket connection open
            await websocket.receive_text()
    except WebSocketDisconnect:
        await disconnect_websocket(websocket)

@app.get("/health")
async def health_check():
    return {"status": "up"}
