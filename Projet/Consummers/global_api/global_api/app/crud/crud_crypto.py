from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from ..models.crypto_list_model import Crypto
from typing import List

async def create_crypto(db_session: AsyncSession, crypto_data: dict) -> Crypto:
    new_crypto = Crypto(**crypto_data)
    db_session.add(new_crypto)
    await db_session.commit()
    await db_session.refresh(new_crypto)
    return new_crypto

async def get_cryptos(db_session: AsyncSession) -> List[Crypto]:
    async with db_session() as session:
        result = await session.execute(select(Crypto))
        return result.scalars().all()
