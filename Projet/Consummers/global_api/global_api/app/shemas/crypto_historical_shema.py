from pydantic import BaseModel
from datetime import date

class CryptoHistoricalDataSchema(BaseModel):
    id: int
    date: date
    open: float
    high: float
    low: float
    close: float
    adj_close: float
    volume: float
    cross: str

    class Config:
        orm_mode = True

    class Config:
        from_attributes = True
