from fastapi import APIRouter
from .endpoints import crypto as crypto_router
from .endpoints import health, sentiments

router = APIRouter()
router.include_router(health.router, prefix="/v1")
router.include_router(crypto_router.router, prefix="/v1")
router.include_router(sentiments.router, prefix="/v1")
