from fastapi import APIRouter
from starlette.concurrency import run_in_threadpool
from ...services.sentiment_analysis import main

router = APIRouter()

@router.get("/sentiment-analysis")
async def sentiment_from_articles():
    results = await run_in_threadpool(main)
    return results