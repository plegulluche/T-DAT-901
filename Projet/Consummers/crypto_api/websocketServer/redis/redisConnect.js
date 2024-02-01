const createClient = require('redis').createClient;
const client = createClient({ url: 'redis://redis:6379' });

const redis = {
    connect: async () => {
        await client.connect();

        client.on('error', (err) => {
            console.log('Redis Client Error ' + err);
        });
    },
    disconnect: async () => {
        await client.disconnect();

        client.on('error', (err) => {
            console.log('Redis Client Error ' + err);
        });
    },
    client: client,
    duplicate: client.duplicate(),
    getTrades: async (symbols, tradeType, terminateCallback) => {
        try {

            return await client.json.get(tradeType, {
                path: symbols
            });

        } catch (err) {
            console.log(err);
            terminateCallback();
        }
    },
    getSubscription: async (callback) => {
        try {
            const subscriber = client.duplicate();
            await subscriber.connect();

            await subscriber.subscribe('liveTrades', (message) => {
                callback(JSON.parse(message)); // 'message'
            });
        } catch (err) {
            console.log(err);
        }
    },
    getKlinesAll: async (symbols, tradeType, terminateCallback) => {
        try {
            return await client.json.get(symbols+tradeType);
        } catch (err) {
            console.log(err);
            terminateCallback();
        }
    },
    getKlines: async (symbols, tradeType, terminateCallback) => {
        try {
            const len = await client.json.ARRLEN(symbols+tradeType);
            return await client.json.get(symbols+tradeType, {
                    path: '[' + (len-1) + ']'
                });
        } catch (err) {
            console.log(err);
            terminateCallback();
        }
    }

}

module.exports = redis;