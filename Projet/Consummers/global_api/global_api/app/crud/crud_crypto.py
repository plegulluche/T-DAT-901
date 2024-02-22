from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.dialects.postgresql import insert
from ..models.crypto_historical_data_model import CryptoHistoricalData
from ..models.crypto_list_model import Crypto
from typing import List


async def create_crypto(db_session: AsyncSession, crypto_data: dict) -> Crypto:
    try:
        stmt = insert(Crypto).values(**crypto_data).on_conflict_do_update(
            index_elements=['coin_name'],
            set_={key: value for key, value in crypto_data.items() if key != 'id'}
        ).returning(*Crypto.__table__.c)

        result = await db_session.execute(stmt)
        await db_session.commit()

        crypto_row = result.fetchone()
        if crypto_row:
            # Ensure conversion to a dictionary is done correctly
            crypto_dict = {column.key: getattr(crypto_row, column.key) for column in Crypto.__table__.columns}
            return Crypto(**crypto_dict)
        else:
            raise Exception("Failed to insert or update the crypto record.")
    except Exception as e:
        await db_session.rollback()
        raise e


async def get_cryptos(db_session: AsyncSession) -> List[Crypto]:
    result = await db_session.execute(select(Crypto))
    return result.scalars().all()


async def bulk_insert_crypto_data(db_session: AsyncSession, data: List[dict]):
    for item in data:
        db_item = CryptoHistoricalData(**item)
        db_session.add(db_item)
    await db_session.commit()