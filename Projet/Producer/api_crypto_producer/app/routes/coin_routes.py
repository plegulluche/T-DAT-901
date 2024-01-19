from flask import Blueprint, jsonify
from app.services.coin_service import get_coins_list_service

coin_routes = Blueprint('coin_routes', __name__)

@coin_routes.route('/api/v2/getcoins', methods=['GET'])
def get_coins_list():
    coins_data, status_code = get_coins_list_service()
    return jsonify(coins_data), status_code


