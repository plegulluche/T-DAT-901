from sqlalchemy import Column, Date, Float, String, Integer
from ..core.database import Base

class CryptoHistoricalData(Base):
    __tablename__ = "crypto_historical_data"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    adj_close = Column(Float)
    volume = Column(Float)
    cross = Column(String)

