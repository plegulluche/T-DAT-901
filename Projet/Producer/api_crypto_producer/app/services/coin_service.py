import os
import requests
import threading
import time
import datetime
import uuid

from app.kafka.producer import send_to_kafka


from dotenv import load_dotenv

load_dotenv()
COIN_SYMBOLS= ['BTC', 'USDT', 'ETH', 'SOL', 'XRP', 'AVAX', 'TRX','OP','LINK', 'ADA']
API_KEY = os.getenv('CRYPTO_COMPARE_API_KEY')
API_BASE_URL= os.getenv('API_BASE_URL_CRYPTO_COMPARE')

# Method to get the top 10 coins list to get the data from 
# def get_toplist_pair_by_volume():
#     endpoint = 'https://min-api.cryptocompare.com/data/top/volumes?tsym=USD&limit=9'
#     response = requests.get(endpoint)
#     if response.status_code == 200:
#         raw_response = response.json()['Data']
#         for coin in raw_response:
#             COIN_SYMBOLS.append(coin['SYMBOL'])
#     send_to_kafka('coin_list', COIN_SYMBOLS)
# Call this function at Flask app startup
# get_toplist_pair_by_volume()
send_to_kafka('coin_list', COIN_SYMBOLS)

# Method to get the list of all coins and theyr id , use the symbol from the response
# on each coin to call get_price_for_coin()
# def fetch_and_batch_coin_list():
#     endpoint = f'/all/coinlist?summary=true&api_key={API_KEY}'
#     url = f"{API_BASE_URL}{endpoint}"
#     response = requests.get(url)
#     if response.status_code == 200:
#         coins = response.json()['Data']
#         # Assuming a batch size of 100 for example
#         batch_size = 100
#         for i in range(0, len(coins), batch_size):
#             batch = dict(list(coins.items())[i:i + batch_size])
#             send_to_kafka('coin_list', batch)  # Replace with Kafka send later
#     else:
#         print("Failed to fetch coin list")

# Call this function at Flask app startup
# fetch_and_batch_coin_list()

def fetch_and_send_coin_price():  
    previous_prices = {}
    while True:
        for coin in COIN_SYMBOLS:
            endpoint= f'/price?fsym={coin}&tsyms=USD,JPY,EUR&api_key={API_KEY}'
            url= f'{API_BASE_URL}{endpoint}'
            response = requests.get(url)
            if response.status_code == 200:
                current_price = response.json()
                if coin not in previous_prices or previous_prices[coin] != current_price:
                    previous_prices[coin] = current_price
                    data = {
                        "key": {
                            "id": str(uuid.uuid4())
                        },
                        "value": {
                            "timestamp": str(datetime.datetime.utcnow().isoformat()),
                            "crypto": coin,
                            "price": current_price
                        }
                    }
                    send_to_kafka(coin + '_price', data)
            else:
                print(f"Failed to fetch price for {coin}")
        time.sleep(10)

# Start this function in a background thread
threading.Thread(target=fetch_and_send_coin_price, daemon=True).start()