// @trade 
// The Trade Streams push raw trade information; each trade has a unique buyer and seller.
// {
//     "e": "trade",     // Event type
//     "E": 123456789,   // Event time
//     "s": "BNBBTC",    // Symbol
//     "t": 12345,       // Trade ID
//     "p": "0.001",     // Price
//     "q": "100",       // Quantity
//     "b": 88,          // Buyer order ID
//     "a": 50,          // Seller order ID
//     "T": 123456785,   // Trade time
//     "m": true,        // Is the buyer the market maker?
//     "M": true         // Ignore
//   }

function tradeParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s,
        tradeId: data.t,
        price: data.p,
        quantity: data.q,
        buyerOrderId: data.b,
        sellerOrderId: data.a,
        tradeTime: data.T,
        isBuyerMarketMaker: data.m,
        ignore: data.M
    }
    return parsedData;
}

// @aggTrade 
// The Aggregate Trade Streams push trade information that is aggregated for a single taker order.
// {
//     "e": "aggTrade",  // Event type
//     "E": 123456789,   // Event time
//     "s": "BNBBTC",    // Symbol
//     "a": 12345,       // Aggregate trade ID
//     "p": "0.001",     // Price
//     "q": "100",       // Quantity
//     "f": 100,         // First trade ID
//     "l": 105,         // Last trade ID
//     "T": 123456785,   // Trade time
//     "m": true,        // Is the buyer the market maker?
//     "M": true         // Ignore
//   }

function aggTradeParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s,
        aggTradeId: data.a,
        price: data.p,
        quantity: data.q,
        firstTradeId: data.f,
        lastTradeId: data.l,
        tradeTime: data.T,
        isBuyerMarketMaker: data.m,
        ignore: data.M
    }
    return parsedData;
}

// @kline
// The Kline/Candlestick Streams push updates to the current klines/candlestick every second.
// {
//     "e": "kline",     // Event type
//     "E": 123456789,   // Event time
//     "s": "BNBBTC",    // Symbol
//     "k": {
//       "t": 123400000, // Kline start time
//       "T": 123460000, // Kline close time
//       "s": "BNBBTC",  // Symbol
//       "i": "1m",      // Interval
//       "f": 100,       // First trade ID
//       "L": 200,       // Last trade ID
//       "o": "0.0010",  // Open price
//       "c": "0.0020",  // Close price
//       "h": "0.0025",  // High price
//       "l": "0.0015",  // Low price
//       "v": "1000",    // Base asset volume
//       "n": 100,       // Number of trades
//       "x": false,     // Is this kline closed?
//       "q": "1.0000",  // Quote asset volume
//       "V": "500",     // Taker buy base asset volume
//       "Q": "0.500",   // Taker buy quote asset volume
//       "B": "123456"   // Ignore
//     }
//   }

function klineParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s,
        kline: {
            startTime: data.k.t,
            closeTime: data.k.T,
            symbol: data.k.s,
            interval: data.k.i,
            firstTradeId: data.k.f,
            lastTradeId: data.k.L,
            openPrice: data.k.o,
            closePrice: data.k.c,
            highPrice: data.k.h,
            lowPrice: data.k.l,
            baseAssetVolume: data.k.v,
            numberOfTrades: data.k.n,
            isKlineClosed: data.k.x,
            quoteAssetVolume: data.k.q,
            takerBuyBaseAssetVolume: data.k.V,
            takerBuyQuoteAssetVolume: data.k.Q,
            ignore: data.k.B
        }
    }
    return parsedData;
}
  

// @miniTicker
// The Mini Ticker Streams push updates to the best bid or ask's price or quantity in real-time for a single symbol every second.
// {
//     "e": "24hrMiniTicker",  // Event type
//     "E": 123456789,         // Event time
//     "s": "BNBBTC",          // Symbol
//     "c": "0.0025",          // Close price
//     "o": "0.0010",          // Open price
//     "h": "0.0025",          // High price
//     "l": "0.0010",          // Low price
//     "v": "10000",           // Total traded base asset volume
//     "q": "18"               // Total traded quote asset volume
//   }

function miniTickerParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s,
        closePrice: data.c,
        openPrice: data.o,
        highPrice: data.h,
        lowPrice: data.l,
        totalTradedBaseAssetVolume: data.v,
        totalTradedQuoteAssetVolume: data.q
    }
    return parsedData;
}

// @ticker
// The Ticker Streams push updates to the best bid or ask's price or quantity in real-time for a single symbol every second.
//24hr rolling window ticker statistics for a single symbol. These are NOT the statistics of the UTC day, but a 24hr rolling window for the previous 24hrs.
// {
//     "e": "24hrTicker",  // Event type
//     "E": 123456789,     // Event time
//     "s": "BNBBTC",      // Symbol
//     "p": "0.0015",      // Price change
//     "P": "250.00",      // Price change percent
//     "w": "0.0018",      // Weighted average price
//     "x": "0.0009",      // First trade(F)-1 price (first trade before the 24hr rolling window)
//     "c": "0.0025",      // Last price
//     "Q": "10",          // Last quantity
//     "b": "0.0024",      // Best bid price
//     "B": "10",          // Best bid quantity
//     "a": "0.0026",      // Best ask price
//     "A": "100",         // Best ask quantity
//     "o": "0.0010",      // Open price
//     "h": "0.0025",      // High price
//     "l": "0.0010",      // Low price
//     "v": "10000",       // Total traded base asset volume
//     "q": "18",          // Total traded quote asset volume
//     "O": 0,             // Statistics open time
//     "C": 86400000,      // Statistics close time
//     "F": 0,             // First trade ID
//     "L": 18150,         // Last trade Id
//     "n": 18151          // Total number of trades
//   }

function tickerParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s ?? data.symbol,
        priceChange: data.p,
        priceChangePercent: data.P,
        weightedAveragePrice: data.w,
        firstTradePrice: data.x,
        lastPrice: data.c,
        lastQuantity: data.Q,
        bestBidPrice: data.b,
        bestBidQuantity: data.B,
        bestAskPrice: data.a,
        bestAskQuantity: data.A,
        openPrice: data.o,
        highPrice: data.h,
        lowPrice: data.l,
        totalTradedBaseAssetVolume: data.v,
        totalTradedQuoteAssetVolume: data.q,
        statisticsOpenTime: data.O,
        statisticsCloseTime: data.C,
        firstTradeId: data.F,
        lastTradeId: data.L,
        totalNumberOfTrades: data.n,
        initialPrice: data.price,
    }
    return parsedData;
}

// @ticker_<window_size>
// The Ticker Streams push updates to the best bid or ask's price or quantity in real-time for a single symbol every second.
// Window Sizes: 1h,4h,1d
// Update Speed: 1000ms
// Note: This stream is different from the <symbol>@ticker stream. The open time O always starts on a minute, while the closing time C is the current time of the update.
// As such, the effective window might be up to 59999ms wider that <window_size>.
// {
//     "e": "1hTicker",    // Event type
//     "E": 123456789,     // Event time
//     "s": "BNBBTC",      // Symbol
//     "p": "0.0015",      // Price change
//     "P": "250.00",      // Price change percent
//     "o": "0.0010",      // Open price
//     "h": "0.0025",      // High price
//     "l": "0.0010",      // Low price
//     "c": "0.0025",      // Last price
//     "w": "0.0018",      // Weighted average price
//     "v": "10000",       // Total traded base asset volume
//     "q": "18",          // Total traded quote asset volume
//     "O": 0,             // Statistics open time
//     "C": 86400000,      // Statistics close time
//     "F": 0,             // First trade ID
//     "L": 18150,         // Last trade Id
//     "n": 18151          // Total number of trades
//   }
  
function tickerWindowSizeParser(data) {
    const parsedData = {
        event: data.e,
        eventTime: data.E,
        symbol: data.s,
        priceChange: data.p,
        priceChangePercent: data.P,
        openPrice: data.o,
        highPrice: data.h,
        lowPrice: data.l,
        lastPrice: data.c,
        weightedAveragePrice: data.w,
        totalTradedBaseAssetVolume: data.v,
        totalTradedQuoteAssetVolume: data.q,
        statisticsOpenTime: data.O,
        statisticsCloseTime: data.C,
        firstTradeId: data.F,
        lastTradeId: data.L,
        totalNumberOfTrades: data.n
    }
    return parsedData;
}

// @bookTicker
// The Book Ticker Streams push any update to the best bid or ask's price or quantity in real-time for a specific symbol.
// {
//     "u":400900217,     // order book updateId
//     "s":"BNBUSDT",     // symbol
//     "b":"25.35190000", // best bid price
//     "B":"31.21000000", // best bid qty
//     "a":"25.36520000", // best ask price
//     "A":"40.66000000"  // best ask qty
//   }
  
function bookTickerParser(data) {
    const parsedData = {
        orderBookUpdateId: data.u,
        symbol: data.s,
        bestBidPrice: data.b,
        bestBidQuantity: data.B,
        bestAskPrice: data.a,
        bestAskQuantity: data.A
    }
    return parsedData;
} 
/*

    1s
    1m
    3m
    5m
    15m
    30m
    1h
    2h
    4h
    6h
    8h
    12h
    1d
    3d
    1w
    1M
*/


// This function is a switch case for the different stream tradeType parsers defined in this file
function tradeTypeStreamParser(jsonData, tradeType) {
    switch (tradeType) {
        case '@trade':
            return tradeParser(jsonData);
        case '@aggTrade':
            return aggTradeParser(jsonData);
        //regex that matches @kline_ with any number of characters after it
        case /@kline_/.test(tradeType):
            return klineParser(jsonData);
        case '@miniTicker':
            return miniTickerParser(jsonData);
        case '@ticker':
            return tickerParser(jsonData);
        //regex that matches @ticker_ with any number of characters after it
        case /@ticker_/.test(tradeType):
            return tickerWindowSizeParser(jsonData);
        case '@bookTicker':
            return bookTickerParser(jsonData);
        case '!ticker@arr':
            return tickerParser(jsonData);
        default:
            return jsonData;
    }
}

module.exports = tradeTypeStreamParser;