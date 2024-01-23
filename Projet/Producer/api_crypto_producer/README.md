### TODO :

- Reference crypto compare in the app : https://www.cryptocompare.com/media/35280519/cc-public-guidelines.pdf

### Endpoints notes 

## coin list 

1 call needed to fetch all coin list 

## global 
**Update every 10 min**
get the market cap , market cap % , and total volume of the 60 first coins , and some other global infos 

## Price data on 1 crypto in real time : 

- uri : https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR
- headers : authorization: Apikey {your_api_key}.
- caching : 10 sec