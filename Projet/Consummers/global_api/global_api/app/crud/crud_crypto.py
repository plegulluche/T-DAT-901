from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.dialects.postgresql import insert
from ..models.crypto_list_model import Crypto
from typing import List


async def create_crypto(db_session: AsyncSession, crypto_data: dict) -> Crypto:
    try:
        # Insert or update the crypto_data
        stmt = insert(Crypto).values(**crypto_data).returning(Crypto.id)
        on_conflict_stmt = stmt.on_conflict_do_update(
            index_elements=['coin_name'],  # Adjust if your unique identifier is different
            set_={c.key: c for c in stmt.excluded if c.key not in ['id']}
        ).returning(Crypto.id)
        result = await db_session.execute(on_conflict_stmt)
        await db_session.commit()
        
        # Fetch the inserted/updated row's id
        crypto_id = result.fetchone()[0]

        # Retrieve the updated/inserted Crypto instance
        result = await db_session.execute(select(Crypto).where(Crypto.id == crypto_id))
        crypto_instance = result.scalars().first()
        return crypto_instance
    except Exception as e:
        await db_session.rollback()  # Rollback in case of error
        raise e  # Log or handle the error as needed

async def get_cryptos(db_session: AsyncSession) -> List[Crypto]:
    async with db_session() as session:
        result = await session.execute(select(Crypto))
        return result.scalars().all()
