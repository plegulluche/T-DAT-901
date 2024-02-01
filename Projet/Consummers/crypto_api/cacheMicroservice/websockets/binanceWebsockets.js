const WebSocket = require('ws');
const { getAllTradingPairs } = require('../controllers/crypto.controller');
const { popularCryptoEmitter } = require('../events/centralizedEvents');
const axios = require('axios');
const websocketUrl1 = 'wss://stream.binance.com:9443';
const websocketUrl2 = 'wss://stream.binance.com:443';
const raw = '/ws/';
const stream = '/stream/';

function BinanceLiveMultiSymbol(redis, symbols, tradeType) {

    const client = redis.client.duplicate();
    const publisher = client.duplicate();
    redis.duplicateConnect(publisher);
    redis.duplicateConnect(client);
    const binanceInit = 'https://api.binance.com/api/v3/ticker/price';
    const symbolsArray = symbols.map(symbol => '"' + symbol.toUpperCase());
    const symbolsString = '%5B' + symbolsArray.join('",') + '"%5D';
    const binanceUrl = `${binanceInit}?symbols=${symbolsString}`;

    axios.get(binanceUrl).then((response) => {
        const data = response.data;
        data.forEach(async (item) => {
            const existingData = await client.json.get(tradeType);
            let constructedObject = { ...existingData };
            constructedObject[item.symbol] = item;
            await client.json.set(tradeType, '$', constructedObject);
        });
    });

    function startWebsocketStream(symbols) {
        if (symbols === undefined || symbols === null || symbols.length === 0) {

            return;
        }
        const streams = symbols.map(symbol => symbol.toLowerCase() + tradeType);

        const socket = new WebSocket(websocketUrl1 + raw + streams.join('/'));
        const terminateCallback = async () => {
            //if socket is open, close it
            if (socket.readyState === 1) {
                await socket.close();
            }

            socket.on('open', function open() {
                socket.close();
            });
        };
        socket.on('open', function open() {
            console.log('connected');
        });
        socket.on('close', function open() {
            console.log('disconnected');
        });
        socket.on('message', async function open(buffer) {
            const data = JSON.parse(buffer);
            const existingData = await client.json.get(tradeType);
            let constructedObject = { ...existingData };
            constructedObject[data.s] = data;
            await client.json.set(tradeType, '$', constructedObject).then(async () => {
                await publisher.publish('liveTrades', JSON.stringify(data.s));
            });
        });

        return terminateCallback;
    }

    let terminateCallback = function () { }

    console.log('symbols', symbols);
    if (symbols.length > 0) {
        console.log('symbols to be executed', symbols);
        terminateCallback = startWebsocketStream(symbols);
    }

    popularCryptoEmitter.on('popularCryptoChange', (data) => {
        terminateCallback();
        terminateCallback = startWebsocketStream(data);
    });

}

function BinanceTradesByType(redis, tradeType) {
    let client = redis.client;
    //redis.duplicateConnect(client);

    //initialisation
    const binanceInit = 'https://api.binance.com/api/v3/ticker/price';
    axios.get(binanceInit).then(async (response) => {
        const data = response.data;
        let constructedObject = {};
        for (let i = 0; i < data.length; i++) {
            constructedObject[data[i].symbol] = data[i];
        }
        await client.json.set(tradeType, '$', constructedObject);
    });
    //initialisation

    const socket = new WebSocket(websocketUrl1 + raw + tradeType);
    const terminateCallback = () => {
        //if socket is open, close it
        if (socket.readyState === 1) {
            socket.close();
        }
        socket.on('open', function open() {
            socket.close();
        });
    };
    socket.on('open', function open() {
        console.log('connected');
    });
    socket.on('close', function open() {
        console.log('disconnected');
    });
    socket.on('message', async function open(buffer) {
        const data = JSON.parse(buffer);
        const existingData = await client.json.get(tradeType);
        let constructedObject = { ...existingData };
        for (let i = 0; i < data.length; i++) {
            constructedObject[data[i].s] = data[i];
        }
        client.json.set(tradeType, '$', constructedObject);
    });
    return terminateCallback;
}

async function BinanceGetKlines(redis, interval) {
    const client = redis.client.duplicate();
    redis.duplicateConnect(client);
    let klineQueue = [];
    const nbConcurrentSymbols = 700;

    const allSymbols = await getAllTradingPairs();

    const restAfterDivision = allSymbols.length % nbConcurrentSymbols;
    const numberOfDivisions = Math.floor(allSymbols.length / nbConcurrentSymbols);

    async function initKline() {
        for (let i = 0; i < allSymbols.length; i++) {
            client.json.set(allSymbols[i] + interval, '$', []);
        }
    }


    async function processKlineQueue() {
        if (klineQueue.length >= nbConcurrentSymbols) {
            for (let i = 0; i < nbConcurrentSymbols; i++) {
                const kline = klineQueue.shift();
                client.json.arrAppend(kline.symbol + interval, '$', kline.kline);
            }
        }
    }

    initKline();
    let nbMessages = 0;
    console.time('nbMessagesReach4000');
    async function constructSocketWithDividedSymbols(intervalMin, intervalMax) {
        let url = websocketUrl1 + '/ws';
        let aggregatedSymbolString = '';

        console.log('constructSocketWithDividedSymbols', intervalMin, intervalMax)

        allSymbols.slice(intervalMin, intervalMax).forEach((symbol) => {
            aggregatedSymbolString = aggregatedSymbolString + '/' + symbol.toLowerCase() + interval;
        });
        url = url + aggregatedSymbolString;
        const socket = new WebSocket(url);
        let accumulatedData = {};
        let count = 0;

        socket.on('open', function open() {
            console.log('connected');
        });
        socket.on('close', function open() {
            console.log('disconnected');
        });
        socket.on('message', async function open(buffer) {
            nbMessages++;
            nbMessages % 100 === 0 && console.log(nbMessages)
            if (nbMessages === 4000) {
                console.timeEnd('nbMessagesReach4000');
            }
            const data = JSON.parse(buffer);
            const kline = { t: data.k.t, o: parseFloat(data.k.o), h: parseFloat(data.k.h), l: parseFloat(data.k.l), c: parseFloat(data.k.c), v: parseFloat(data.k.v) };
            // try {
            if (accumulatedData[data.s]?.kline) {
                if (accumulatedData[data.s].kline[0] === kline.t) {

                    // accumulatedData = {
                    //     ...accumulatedData,
                    //     [data.s]: {
                    //         kline: [
                    //             kline.t,
                    //             kline.o,
                    //             kline.h,
                    //             kline.l,
                    //             kline.c,
                    //             kline.v + accumulatedData[data.s].kline[5]
                    //         ]
                    //     }
                    // };

                    accumulatedData[data.s] = { kline: [kline.t, kline.o, kline.h, kline.l, kline.c, kline.v + accumulatedData[data.s].kline[5]] };

                    count++;

                } else {
                    // accumulatedData = {
                    //     ...accumulatedData,
                    //     [data.s]: {
                    //         kline: [
                    //             kline.t,
                    //             kline.o,
                    //             kline.h,
                    //             kline.l,
                    //             kline.c,
                    //             kline.v
                    //         ]
                    //     }
                    // };

                    // const key = Object.keys(data);
                    // console.log(key, 'data' ,data.kline);
                    //client.json.arrAppend(key + interval, '$', accumulatedData.kline);



                    client.json.arrAppend(data.s + interval, '$', accumulatedData[data.s].kline);
                    accumulatedData[data.s].kline = [];

                    // klineQueue.push(accumulatedData);
                    // console.log('klineQueue.length', accumulatedData.symbol + interval, kline.t);
                    accumulatedData[data.s] = { kline: [kline.t, kline.o, kline.h, kline.l, kline.c, kline.v] } ;
                    count = 0;
                }
            }
            else {
                accumulatedData[data.s] = { kline: [kline.t, kline.o, kline.h, kline.l, kline.c, kline.v] };
                count = 0;
            }
            // } catch (e) {
            //     accumulatedData = { ...accumulatedData, [data.s]: { kline: [kline.t, kline.o, kline.h, kline.l, kline.c, kline.v] } };
            //     count = 0;
            // }
            // if (klineQueue.length >= nbConcurrentSymbols) {
            //     processKlineQueue();
            // }

        });

        const terminateCallback = () => {
            //if socket is open, close it
            if (socket.readyState === 1) {
                socket.close();
            }
            socket.on('open', function open() {
                socket.close();
            });
        }
    }

    for (let i = 0; i < numberOfDivisions; i++) {
        constructSocketWithDividedSymbols(i * nbConcurrentSymbols, (i + 1) * nbConcurrentSymbols);
    }
    constructSocketWithDividedSymbols(numberOfDivisions * nbConcurrentSymbols, numberOfDivisions * nbConcurrentSymbols + restAfterDivision);

}

module.exports = { BinanceLiveMultiSymbol, BinanceTradesByType, BinanceGetKlines };