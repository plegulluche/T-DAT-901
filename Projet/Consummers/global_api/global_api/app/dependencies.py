from .core.database import SessionLocal
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session
