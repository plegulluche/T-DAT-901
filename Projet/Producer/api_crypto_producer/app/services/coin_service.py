import os
import requests
from app.kafka.producer import send_to_kafka

from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
API_BASE_URL= os.getenv('API_BASE_URL')

def get_coins_list_service():
    endpoint = f'/coins/list?x_cg_demo_api_key={API_KEY}'
    url = f"{API_BASE_URL}{endpoint}"
    response = requests.get(url)
    if response.status_code == 200:
        coins_data = response.json()
        # Batching
        batch_size = 100
        for i in range(0, len(coins_data), batch_size):
            batch = coins_data[i:i+batch_size]
            send_to_kafka('crypto_topic', batch)  # Send each batch
        return coins_data, 200
    else:
        return {"error": "Failed to fetch data"}, response.status_code

