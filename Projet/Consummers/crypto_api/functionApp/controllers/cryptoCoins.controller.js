const {Blob} = require('buffer');
const CryptoCoinsModel = require('../models/cryptoCoins.model');
const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');
const axios = require('axios');
const rateLimit = require("axios-rate-limit");
const mongoose = require("mongoose");
const {uploadImageToAzureBlob} = require('../blob-storage-logic/uploadImageAzureBlob');
const maxRequests = 15;
const http = rateLimit(axios.create(), { maxRequests: maxRequests, perMilliseconds: 1000, maxRPS: maxRequests });

let CryptoCoinsController = {

    createAllCryptoAndDetailsOrUpdate: async () => {
        const binanceAllAssets = await axios.get('https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset');
        console.log('binanceAllAssets', binanceAllAssets.data.data.length);

        CryptoCoinsModel.parseDataAndUpdate(binanceAllAssets.data.data).then(async () => {
            console.log('created or updated all coins');

            const cryptoCoins = await CryptoCoinsModel.find();
            console.log('cryptoCoins', cryptoCoins);
            console.log('Crypto coins from db: ', cryptoCoins.length);
            //loop through all crypto coins from db
            for (let i = 0; i < cryptoCoins.length; i++) {
                let tempState = '';
                //get details from api
                console.log(cryptoCoins[i].symbol, 'trying to update details');
                const cryptoDetailFromBinanceAPI = await http.get(`https://www.binance.com/bapi/composite/v1/public/marketing/tardingPair/detail?symbol=${cryptoCoins[i].symbol}`);
                //create details for coin
                tempState = `details NOT CREATED, DATA is ${cryptoDetailFromBinanceAPI.data.data.length}`;
                if (cryptoDetailFromBinanceAPI.data.data.length !== 0) {
                    tempState = 'details CREATED';
                    await CryptoCoinsModel.coinCreateDetails(cryptoCoins[i], cryptoDetailFromBinanceAPI.data.data[0]);
                }

                console.log(i + " - " + cryptoCoins[i].symbol, tempState);
                
            }
            for (let i = 0; i < cryptoCoins.length; i++) {
                //get crypto coin details from db via crypto coin id
                let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({cryptoCoin: cryptoCoins[i]._id});
                //if crypto coin details exist
                if (cryptoCoinDetails) {
                    //update crypto coin details logoUrl with crypto coin logoUrl, name and symbol
                    cryptoCoins[i].marketCap = cryptoCoinDetails.marketCap;
                    cryptoCoins[i].circulatingSupply = cryptoCoinDetails.circulatingSupply;
                    cryptoCoins[i].totalSupply = cryptoCoinDetails.totalSupply;
                    //save crypto coin details
                    await cryptoCoins[i].save();
                } 
            }
        });
        //get all crypto coins from db

    },
    downloadAndUpload: async () => {        

        const download = async (url) => {

            const image = await http.get(url, {
                responseType: 'arraybuffer',
                headers: {
                    'Referer': 'https://www.binance.com/',
                }

            }).then(response => {
                  return response.data
            }).catch(err => {
                console.log(err);
            });
            return image;
        }

        await CryptoCoinsModel.getCoinLogoUrlsAndUpload(download, uploadImageToAzureBlob);
    },
    getTradinPairs: async () => {
        const tradingPairs = await http.get('https://api.binance.com/api/v3/exchangeInfo');
        //get all crypto coins from db
        const cryptoCoins = await CryptoCoinsModel.find();
        //loop through all crypto coins from db
        for (let i = 0; i < cryptoCoins.length; i++) {
            const cryptoDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoins[i]._id });
            const tradingPair = tradingPairs.data.symbols.filter((pair) => {
                return pair.baseAsset === cryptoCoins[i].symbol;
            });
            if (tradingPair.length !== 0) {
                cryptoDetails.tradingPairs = tradingPair;
                await cryptoDetails.save();
            }
        }       

    },
};

module.exports = CryptoCoinsController;

