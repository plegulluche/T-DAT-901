const { createServer } = require('http');
const redis = require('../redis/redisConnect');
const url = require("url");
const server = createServer();
const { WebSocketServer } = require('ws');
const { EventEmitter } = require('events');

const liveEmitter = new EventEmitter();

const wss = new WebSocketServer({ server });

function setLiveData(tradingPair) {
  //tradingPair symbol that has been updated, setLiveData is a callback
  liveEmitter.emit(tradingPair, tradingPair);
}


function heartbeat() {
  this.isAlive = true;
}

redis.getSubscription(setLiveData);
let allInterval;

wss.on('connection', function connection(ws, req) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  const reqUrl = url.parse(req.url, true);

  function terminateConnection() {
    ws.terminate();
    clearInterval(allInterval);
  }

  if (reqUrl.query.symbol && reqUrl.query.type === '!ticker@arr') {
    //send trades to client every 1 second
    //split symbol into array by / delimiter
    const symbols = reqUrl.query.symbol.split('/');
    console.log('symbols', symbols);
    allInterval = setInterval(async () => {
      redis.getTrades(symbols, reqUrl.query.type, terminateConnection).then((trades) => {
        ws.send(JSON.stringify(trades));
      });
    }, 1000);
  }

  if (reqUrl.query.type === '@trade' && reqUrl.query.symbol) {
    //send trades to client as soon as they are updated
    const symbols = reqUrl.query.symbol.split('/');
    console.log('symbols', symbols);
    symbols.forEach((symbol) => {
      liveEmitter.on(symbol, (data) => {
        if (symbol === data) {
          redis.getTrades(data, reqUrl.query.type, terminateConnection).then((trades) => {
            ws.send(JSON.stringify(trades));
          });
        }
      });
    });
  }

  if(reqUrl.query.type === '@kline_1m' && reqUrl.query.symbol){
    //send klines to client every 1 second
    const symbols = reqUrl.query.symbol.split('/');
    console.log('symbols', symbols);
    redis.getKlinesAll(symbols, reqUrl.query.type, terminateConnection).then((klines) => {
      ws.send(JSON.stringify(klines));
    });
    allInterval = setInterval(async () => {
      redis.getKlines(symbols, reqUrl.query.type, terminateConnection).then((klines) => {
        ws.send(JSON.stringify(klines));
      });
    }, 2000);
  }


});


const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false){
      console.log('connection dropped')
      return ws.terminate();
    }
    console.log('connection alive')
    ws.isAlive = false;
    ws.ping();
  });
}, 3000);

wss.on('close', function close() {
  clearInterval(interval);
  clearInterval(allInterval);
});

server.listen(process.env.PORT);
