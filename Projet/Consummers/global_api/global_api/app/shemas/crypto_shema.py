from pydantic import BaseModel

class CryptoSchema(BaseModel):
    id: int
    coin_name: str
    coin_full_name: str
    launch_date: str
    max_supply: float
    supply: float
    circulating_supply: float

    class Config:
        orm_mode = True
