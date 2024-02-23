from fastapi import FastAPI
from .services.historical_data_service import cache_crypto_data
from .core.database import create_tables
from .api import routers
from fastapi.middleware.cors import CORSMiddleware

import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = FastAPI()


async def startup():
    # Create database tables
    await create_tables()
    await cache_crypto_data()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Specify the correct origin
    allow_credentials=True,
    allow_methods=[""],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.add_event_handler("startup", startup)

# Include the API router from routers.py, which includes all routes from crypto.py
app.include_router(routers.router, prefix="/api")


