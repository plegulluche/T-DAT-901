import os
import requests
from app.kafka.producer import send_to_kafka

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('CRYPTO_COMPARE_API_KEY')
API_BASE_URL= os.getenv('API_BASE_URLAPI_BASE_URL_CRYPTO_COMPARE')

# Method to get the list of all coins and theyr id , use the symbol from the response
# on each coin to call get_price_for_coin()
def get_coins_list_service():
    endpoint = f'/all/coinlist?summary=true&api_key={API_KEY}'
    url = f"{API_BASE_URL}{endpoint}"
    response = requests.get(url)
    if response.status_code == 200:
        coins_data = response.json()
        # Batching
        batch_size = 20
        for i in range(0, len(coins_data), batch_size):
            batch = coins_data[i:i+batch_size]
            send_to_kafka('crypto_topic', batch)  # Send each batch
        return coins_data, 200
    else:
        return {"error": "Failed to fetch data"}, response.status_code

def get_price_for_coin(coin_symbol):
    endpoint= f'price?fsym={coin_symbol}&tsyms=USD,JPY,EUR&api_key={API_KEY}'
    url= f'{API_BASE_URL}{endpoint}'
    response= requests.get(url)
    if response.status_code == 200:
        coins_data = response.json()
        send_to_kafka({coin_symbol}, coins_data)
        return {"message": f"Data sent to topic {coin_symbol}"}
    else:
        return {"error": "Failed to fetch data"}, response.status_code
