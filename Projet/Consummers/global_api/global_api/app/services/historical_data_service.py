import yfinance as yf
import pandas as pd
from ..crud.crud_crypto import bulk_insert_crypto_data
from ..core.database import SessionLocal

class CryptoDataService:
    def __init__(self, start_date: str, end_date: str, crosses: list):
        self.start_date = start_date
        self.end_date = end_date
        self.crosses = crosses

    def fetch_crypto_data(self) -> pd.DataFrame:
        df_raw = pd.DataFrame()
        for cross in self.crosses:
            data = yf.download(cross, start=self.start_date, end=self.end_date)
            data = data.reset_index()
            data['Cross'] = cross
            # Ensure DataFrame column names align with the model
            data.rename(columns={
                'Date': 'date',
                'Open': 'open',
                'High': 'high',
                'Low': 'low',
                'Close': 'close',
                'Adj Close': 'adj_close',
                'Volume': 'volume',
                'Cross': 'cross'
            }, inplace=True)
            # Convert 'date' column to datetime.date
            data['date'] = pd.to_datetime(data['date']).dt.date
            df_raw = pd.concat([df_raw, data], ignore_index=True)
        return df_raw

async def cache_crypto_data():
    fiat = ['EUR', 'USD']
    crypto = [
        'BTC', 'ETH', 'USDT', 'SOL', 'XRP', 'USDC',
        'ADA', 'AVAX', 'LINK', 'TRX', 'DOT', 'MATIC'
    ]

    crosses = [f"{c}-{f}" for f in fiat for c in crypto]
    print('CROSSES : ', crosses)

    service = CryptoDataService("2022-01-01", "2024-01-01", crosses)
    df = service.fetch_crypto_data()

    if not df.empty:
        data_dicts = df.to_dict('records')
        # Use async_session to create a context-managed session
        async with SessionLocal() as db:
            await bulk_insert_crypto_data(db, data_dicts)
