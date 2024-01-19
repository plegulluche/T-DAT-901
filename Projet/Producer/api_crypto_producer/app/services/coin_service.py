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
    print("DEBUG URL :", url)
    response = requests.get(url)
    if response.status_code == 200:
        coins_data = response.json()
        send_to_kafka('crypto_topic', coins_data)  # Kafka Producer Call
        return coins_data, 200
    else:
        return {"error": "Failed to fetch data"}, response.status_code

