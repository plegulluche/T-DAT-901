from fastapi import FastAPI
from app.api import routers

app = FastAPI()


# Include the API router from routers.py, which includes all routes from crypto.py
app.include_router(routers.router, prefix="/api")

@app.get("/health")
async def health_check():
    return {"status": "up"}
