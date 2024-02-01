const array = require('../constants/testConstants');

const createClient = require('redis').createClient;

const client = createClient({ url: 'redis://redis:6379' });

client.on('error', (err) => {
    console.log('Redis Client Error ' + err);
});

let TestController = {
    performanceTest : async (req, res) => {

        await client.connect();

        const data = array.data;
        try {
            let constructedObject = {};
            for (let i = 0; i < data.length; i++) {
                await client.set(data[i].s, JSON.stringify(data[i]));
            }

            const value = await client.get('BNBBTC');
            await client.disconnect();
            res.status(200).json(value);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = TestController;