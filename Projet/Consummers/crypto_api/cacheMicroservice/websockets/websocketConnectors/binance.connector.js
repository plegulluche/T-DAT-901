const redis = require('../../redis/redisConnect');
redis.connect();
const {listenForPopularCryptoChangesAndGetTradingPairs, getTradingPairs} = require('../../controllers/popularCrypto.controller');

const {BinanceLiveMultiSymbol, BinanceTradesByType, BinanceGetKlines} = require('../binanceWebsockets');

listenForPopularCryptoChangesAndGetTradingPairs();

async function BinanceConnector(tradeType) {

    const tradingPairs = await getTradingPairs();

    switch (tradeType) {
        case '!ticker@arr' : return BinanceTradesByType(redis, '!ticker@arr');
        case '@trade' : return BinanceLiveMultiSymbol(redis, tradingPairs, '@trade');
        case '@aggTrade' : return BinanceLiveMultiSymbol(redis, tradingPairs, '@aggTrade');
        case '@kline_1m' : return BinanceGetKlines(redis, '@kline_1m');
        default : return BinanceTradesByType(redis, tradeType);
    }
}



module.exports = BinanceConnector;