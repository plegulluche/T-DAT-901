from fastapi import FastAPI
from .core.database import create_tables
from app.api import routers

app = FastAPI()

async def startup():
    # Create database tables
    await create_tables()

app.add_event_handler("startup", startup)

# Include the API router from routers.py, which includes all routes from crypto.py
app.include_router(routers.router, prefix="/api")


@app.get("/health")
async def health_check():
    return {"status": "up"}
