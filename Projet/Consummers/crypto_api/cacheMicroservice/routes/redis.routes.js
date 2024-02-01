const router = require('express').Router();
const RedisController = require("../controllers/redis.controller");

router.get("/test-redis/:pair", 
    RedisController.cacheTest
);

module.exports = router;