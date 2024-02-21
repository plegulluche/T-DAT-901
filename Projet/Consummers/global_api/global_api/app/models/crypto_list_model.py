from sqlalchemy import Column, Integer, String, Float
from sqlalchemy import UniqueConstraint

from ..core.database import Base

class Crypto(Base):
    __tablename__ = "cryptos_list"

    id = Column(Integer, primary_key=True, index=True)
    coin_name = Column(String, index=True)
    coin_full_name = Column(String)
    launch_date = Column(String)
    max_supply = Column(Float)
    supply = Column(Float)
    circulating_supply = Column(Float)

    __table_args__ = (UniqueConstraint('coin_name'),)

    class Config:
        orm_mode = True