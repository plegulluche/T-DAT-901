import httpx
from typing import Any, Dict, List

async def fetch_top_coin_infos(api_url: str) -> List[Dict[str, Any]]:
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(api_url)
            response.raise_for_status()
            data = response.json()["Data"]  # Adjusted to directly access the 'Data' key

            parsed_data = [
                {
                    "coin_name": coin["CoinInfo"]["Name"],
                    "coin_full_name": coin["CoinInfo"]["FullName"],
                    "launch_date": coin["CoinInfo"]["AssetLaunchDate"],
                    "max_supply": coin["CoinInfo"]["MaxSupply"],
                    "supply": coin["DISPLAY"]["USD"]["SUPPLY"],
                    "circulating_supply": coin["DISPLAY"]["USD"]["CIRCULATINGSUPPLY"]
                } for coin in data
            ]
            return parsed_data
        except httpx.RequestError as e:
            print(f"An error occurred while requesting {e.request.url!r}.")
        except httpx.HTTPStatusError as e:
            print(f"Error response {e.response.status_code} while requesting {e.request.url!r}.")
