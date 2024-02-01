const express = require('express');
const redis = require('./redis/redisConnect');
const app = express();
const websocketController = require('./websockets/websocket.controller');
redis.connect();

if(process.env.pm_id === '0') {

}
