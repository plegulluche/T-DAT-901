const tradeTypeStreamParser = require('../../parsers/websocketParser');

const websocketUrl1 = 'ws://localhost:8082/';
const queryType = '?type='
const querySymbol = '&symbol='



function websocketConnect(symbol, tradeType, setHasConnected, stateCallback) {

    if (symbol === undefined || symbol === null || symbol === '') {
        console.log('Symbol is undefined');
        return;
    }

    const socket = new WebSocket(websocketUrl1 + queryType + tradeType + querySymbol + symbol.toUpperCase());

    const terminateCallback = () => {
        //if socket is open, close it
        if (socket.readyState === 1) {
            socket.close();
        }

        socket.onopen = () => {
            socket.close();
        }
    };

    socket.onopen = () => {
        console.log('connected');
        setHasConnected(true);
    };
    socket.onclose = () => {
        console.log('disconnected');
    };

    socket.onmessage = (event) => {
        stateCallback(tradeTypeStreamParser(event.data, tradeType));
    };

    return terminateCallback;
}


function websocketConnectMulti(symbols, tradeType, setHasConnected, stateCallback) {

    if (symbols === undefined || symbols === null || symbols === []) {
        console.log('Symbol is undefined');
        return;
    }
    const streams = symbols.map(symbol => symbol.symbol.toUpperCase());
    const query = websocketUrl1 + queryType + tradeType + querySymbol + streams.join('/');
    console.log(query)
    const socket = new WebSocket(query);

    const terminateCallback = () => {
        //if socket is open, close it
        if (socket.readyState === 1) {
            socket.close();
        }

        socket.onopen = () => {
            socket.close();
        }
    };

    socket.onopen = () => {
        console.log('connected');
        setHasConnected(true);
    };
    socket.onclose = () => {
        console.log('disconnected');
    };

    socket.onmessage = (event) => {
        // for(const [symbol, data] of Object.entries(event?.data)) {
        //     console.log(symbol, data)
        //     stateCallback(tradeTypeStreamParser(data, tradeType));
        // }
        //loop through event.data and call stateCallback
        const data = JSON.parse(event.data);
        let arrayOfValues = [];
        
        if (Object.keys(data).length <= 2 && !(data[streams[0]]?.symbol || data[streams[0]]?.s)) {
            arrayOfValues = [...arrayOfValues, tradeTypeStreamParser(data, tradeType)];
        }
        else
            for (const [symbol, value] of Object.entries(data)) {
                arrayOfValues = [...arrayOfValues, tradeTypeStreamParser(value, tradeType) ];
            }

        stateCallback(arrayOfValues);
    };  

    return terminateCallback;
}


export { websocketConnectMulti, websocketConnect };