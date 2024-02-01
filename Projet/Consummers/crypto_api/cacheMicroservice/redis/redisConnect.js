const createClient = require('redis').createClient;
const client = createClient({ url: 'redis://redis:6379' });
const redis = {
    connect : async () => {
        await client.connect();

        client.on('error', (err) => {
            console.log('Redis Client Error ' + err);
        });
    },
    disconnect : async () => {
        await client.disconnect();

        client.on('error', (err) => {
            console.log('Redis Client Error ' + err);
        });
    },
    client : client,
    duplicateConnect : async (dupClient) => {
        await dupClient.connect();
        dupClient.on('error', (err) => {
            console.log('Redis Client Error ' + err);
        });
    }
}

module.exports = redis;