from flask import Blueprint, jsonify
from app.services.coin_service import get_coins_list_service, get_price_for_coin_service

coin_routes = Blueprint('coin_routes', __name__)

@coin_routes.route('/api/v2/getcoins', methods=['GET'])
def get_coins_list():
    coins_data, status_code = get_coins_list_service()
    return jsonify(coins_data), status_code


@coin_routes.route('/api/v2/getprice', methods=['GET'])
def get_price_for_a_coin_real_time():
    coin_data, status_code = get_price_for_coin_service()
    return jsonify(coin_data), status_code