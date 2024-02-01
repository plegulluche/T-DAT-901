const redis = require('../redis/redisConnect');

let RedisController = {
    cacheTest : async (req, res) => {
        try {
            //const value = await redis.client.get(req.params.pair);
            const value = await redis.client.json.get('all', {
                path: req.params.pair
            });
            res.status(200).json(value);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = RedisController;