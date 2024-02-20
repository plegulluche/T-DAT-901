import httpx
from typing import Any, Dict, List
import os
from dotenv import load_dotenv

from ..utils.types_operations import parse_float

load_dotenv()

API_KEY = os.getenv('API_KEY')

async def fetch_top_coin_infos(api_url: str) -> List[Dict[str, Any]]:
    params = {"authorization": API_KEY}
    print('PARAMS :' ,params)
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(api_url, params=params)
            response.raise_for_status()
            data = response.json()["Data"]

            parsed_data = [
                {
                    "coin_name": coin["CoinInfo"]["Name"],
                    "coin_full_name": coin["CoinInfo"]["FullName"],
                    "launch_date": coin["CoinInfo"]["AssetLaunchDate"],
                    "max_supply": float(coin["CoinInfo"]["MaxSupply"]),
                    "supply": parse_float(coin["DISPLAY"]["USD"]["SUPPLY"]),
                    "circulating_supply": parse_float(coin["DISPLAY"]["USD"]["CIRCULATINGSUPPLY"])
                } for coin in data
            ]
            print('PARSED DATA :', parsed_data)
            return parsed_data
        except httpx.RequestError as e:
            print(f"An error occurred while requesting {e.request.url!r}.")
        except httpx.HTTPStatusError as e:
            print(f"Error response {e.response.status_code} while requesting {e.request.url!r}.")
