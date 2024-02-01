require('dotenv').config()
require('../config/db');
const cryptoCoinModel = require('../models/cryptoCoins.model');
const CryptoCoinsController = require('../controllers/cryptoCoins.controller');
const axios = require('axios');

module.exports = async function (context, req) {

    CryptoCoinsController.createAllCryptoAndDetailsOrUpdate()
        .then(() => {
            CryptoCoinsController.downloadAndUpload()
                .then(() => {
                    CryptoCoinsController.getTradinPairs()
                        .then((data) => {
                            context.res = {
                                // status: 200, /* Defaults to 200 */
                                body: data
                            };
                        }
                        ).catch((err) => {
                            context.res = {
                                status: 500,
                                body: err
                            };
                        });
                }
                ).catch((err) => {
                    context.res = {
                        status: 500,
                        body: err
                    };
                });
        }
        ).catch((err) => {
            context.res = {
                status: 500,
                body: err
            };
        });


}