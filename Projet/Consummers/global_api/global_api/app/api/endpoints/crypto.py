from fastapi import APIRouter, Depends, HTTPException, Query
from datetime import date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from ...core.database import SessionLocal
from ...crud.crud_crypto import create_crypto, get_cryptos
from ...shemas.crypto_shema import CryptoSchema
from ...models.crypto_historical_data_model import CryptoHistoricalData
from ...utils.api_client import fetch_top_coin_infos
from ...dependencies import get_db_session

router = APIRouter()

@router.post("/cryptos", response_model=List[CryptoSchema])
async def add_crypto(api_url: str, db: AsyncSession = Depends(get_db_session)):
    # Fetch data from external API
    try:
        crypto_data_list = await fetch_top_coin_infos(api_url)
        created_cryptos = []
        for crypto_data in crypto_data_list:
            created_crypto = await create_crypto(db, crypto_data)
            created_cryptos.append(created_crypto)
        return created_cryptos
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/cryptos", response_model=List[CryptoSchema])
async def read_cryptos(db: AsyncSession = Depends(get_db_session)):
    cryptos = await get_cryptos(db)
    return cryptos

@router.get('/historical-data')
async def get_crypto_data(
    fiat: str,
    coin: str,
    start_date: date = Query(...),
    end_date: date = Query(...)
):
    async with SessionLocal() as db:
        query = select(CryptoHistoricalData).filter(
            CryptoHistoricalData.cross == f"{coin}-{fiat}",
            CryptoHistoricalData.date >= start_date,
            CryptoHistoricalData.date <= end_date
        )
        result = await db.execute(query)
        data = result.scalars().all()
        return {"data": data}