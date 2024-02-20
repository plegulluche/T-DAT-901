from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from ...crud.crud_crypto import create_crypto, get_cryptos
from ...shemas.crypto_shema import CryptoSchema
from ...utils.api_client import fetch_top_coin_infos
from ...dependencies import get_db_session

router = APIRouter()

@router.post("/cryptos", response_model=CryptoSchema)
async def add_crypto(api_url: str, db: AsyncSession = Depends(get_db_session)):
    # Fetch data from external API
    try:
        crypto_data_list = await fetch_top_coin_infos(api_url)
        for crypto_data in crypto_data_list:
            await create_crypto(db, crypto_data)
        return {"message": "Cryptos added successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/cryptos", response_model=List[CryptoSchema])
async def read_cryptos(db: AsyncSession = Depends(get_db_session)):
    cryptos = await get_cryptos(db)
    return cryptos
