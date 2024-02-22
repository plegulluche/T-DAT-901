from fastapi import FastAPI
from .services.historical_data_service import cache_crypto_data
from .core.database import create_tables
from app.api import routers

import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()

async def startup():
    # Create database tables
    await create_tables()
    # await cache_crypto_data()


app.add_event_handler("startup", startup)

# Include the API router from routers.py, which includes all routes from crypto.py
app.include_router(routers.router, prefix="/api")


