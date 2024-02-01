const express = require('express');
const BinanceConnector = require('./websockets/websocketConnectors/binance.connector');
require('./config/db');
const app = express();

const terminateBinanceTradesByType = BinanceConnector('!ticker@arr');
const terminateBinanceLiveMultiSymbol = BinanceConnector('@trade');
const terminateBinanceKlines = BinanceConnector('@kline_1m');

// view engine setup
app.use(express.json());

app.listen(8081, () => console.log('serveur started :' + process.env.PORT));

module.exports = app;
