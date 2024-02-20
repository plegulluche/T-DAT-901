from fastapi import APIRouter
from .endpoints import crypto as crypto_router

router = APIRouter()
router.include_router(crypto_router.router, prefix="/v1")
