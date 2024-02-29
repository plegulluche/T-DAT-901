from flask import Flask
from app.services.coin_service import fetch_and_send_coin_price
import threading

app = Flask(__name__)

# Call the fetch and batch function
# get_toplist_pair_by_volume()


# Start the background thread for continuous price fetching
threading.Thread(target=fetch_and_send_coin_price, daemon=True).start()
