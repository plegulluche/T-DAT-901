from flask import jsonify
from app import app
import os
import requests
from dotenv import load_dotenv


load_dotenv()

API_BASE_URL = "https://api.coingecko.com/api/v3"
API_KEY = os.environ.get('GECKO_API_KEY')


@app.route('/api/v2/getcoins', methods=['GET'])
def get_coins_list():
    headers = {
        'x_cg_demo_api_key': API_KEY
    }
    endpoint = f'/coins/list?x_cg_demo_api_key={API_KEY}'
    url = f"{API_BASE_URL}{endpoint}"

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        coins_data = response.json()
        return jsonify(coins_data), 200
    else:
        return jsonify({"error": "Failed to fetch data"}), response.status_code
    
