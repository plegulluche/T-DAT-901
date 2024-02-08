from fastapi import FastAPI

app = FastAPI(title="Global API for Cryptocurrency Data")

@app.get("/health")
async def health_check():
    return {"status": "up"}
