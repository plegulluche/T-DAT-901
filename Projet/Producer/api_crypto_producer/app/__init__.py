from flask import Flask
from app.services.coin_service import fetch_and_batch_coin_list, fetch_and_send_coin_price
import threading

app = Flask(__name__)

# Call the fetch and batch function
fetch_and_batch_coin_list()

# Start the background thread for continuous price fetching
threading.Thread(target=fetch_and_send_coin_price, daemon=True).start()
