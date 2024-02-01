const PopularCryptoModel = require('../models/popularCrypto.model');
const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');
const CryptoCoinsModel = require('../models/cryptoCoins.model');
const mongoose = require('mongoose')

let PopularCryptoController = {
    getAll: async (req, res) => {
        try {
            let tab = []
            let popularCryptos = await PopularCryptoModel.find();
            for (let i=0; i < popularCryptos.length; i++) {
                let crypto = await CryptoCoinsModel.findById(popularCryptos[i].cryptoCoin.toString())
                tab.push(crypto)
            }
            res.status(200).json(tab);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let crypto = await CryptoCoinsModel.findById(req.body.cryptoId);
            let popularCrypto = await PopularCryptoModel.create({ cryptoCoin: crypto });
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let crypto = await CryptoCoinsModel.findById(req.params.id)
            let popularCrypto = await PopularCryptoModel.findOneAndDelete({cryptoCoin: crypto._id})
            res.status(200).json(popularCrypto);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    getPopularTradingPairs: async (req, res) => {
        try {
            let popularCryptos = await PopularCryptoModel.find();
            let cryptoTradingPairs = [];
            for (let i = 0; i < popularCryptos.length; i++) {
                let cryptoDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: popularCryptos[i].cryptoCoin });
                cryptoDetails.tradingPairs.forEach(tradingPair => {
                    cryptoTradingPairs.push(tradingPair.symbol);
                });
            }
            res.status(200).json(cryptoTradingPairs);
        } catch (err) {
            res.status(500).json(err);
        }
    },

}

module.exports = PopularCryptoController;