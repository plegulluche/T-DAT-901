const CryptoCoinsModel = require('../models/cryptoCoins.model');
const CryptoCoinDetailsModel = require('../models/cryptoCoinDetails.model');
const PopularCryptoModel = require('../models/popularCrypto.model');
const express = require('express');
const paginate = require('express-paginate');

let CryptoCoinsController = {
    getAll: async (req, res) => {
        try {
            
            let cryptoCoin = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd0f");
            let cryptoCoin2 = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd15");
            let cryptoCoin3 = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd27");
            let cryptoCoin4 = await CryptoCoinsModel.findById("637f9ee1629c8bb3fa22de61");
            let cryptoCoin5 = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd71");
            let cryptoCoin6 = await CryptoCoinsModel.findById("637f9ede629c8bb3fa22dc99");
            let cryptoCoin7 = await CryptoCoinsModel.findById("637f9ee0629c8bb3fa22dda9");
            let cryptoCoin8 = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd4b");
            let cryptoCoin9 = await CryptoCoinsModel.findById("637f9edf629c8bb3fa22dd3d");
            let cryptoCoin10 = await CryptoCoinsModel.findById("637f9ede629c8bb3fa22dccd");

            // inspired by Stripe's API response for list objects
            res.status(200).json({
                cryptoCoins: [cryptoCoin, cryptoCoin2, cryptoCoin3, cryptoCoin4, cryptoCoin5, cryptoCoin6, cryptoCoin7, cryptoCoin8, cryptoCoin9, cryptoCoin10],
            });


        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        //a changer
        try {
            let cryptoCoin = await CryptoCoinsModel.findById(req.params.id);
            let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: req.params.id });
            let response = {
                cryptoCoin: cryptoCoin,
                cryptoCoinDetails: cryptoCoinDetails
            }
            res.status(200).json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByName: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findOne({ name: req.params.name });
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.create(req.body);
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateById: async (req, res) => {
        try {
            let coin = await CryptoCoinsModel.findById(req.params.id);
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, { name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol })
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateByName: async (req, res) => {
        try {
            let coin = await CryptoCoinsModel.findOne({ name: req.params.name });
            let cryptoCoin = await CryptoCoinsModel.findByIdAndUpdate(coin._id, { name: req.params.name ?? coin.name, symbol: req.params.symbol ?? coin.symbol })
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let cryptoCoin = await CryptoCoinsModel.findByIdAndDelete(req.params.id);
            res.status(200).json(cryptoCoin);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateCryptoDetails: async (req, res) => {
        try {
            //get all crypto coins
            let cryptoCoins = await CryptoCoinsModel.find();
            //loop through all crypto coins
            for (let i = 0; i < cryptoCoins.length; i++) {
                //get crypto coin details from db via crypto coin id
                let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoins[i]._id });
                //if crypto coin details exist
                if (cryptoCoinDetails) {
                    //update crypto coin details logoUrl with crypto coin logoUrl, name and symbol
                    cryptoCoinDetails.logoUrl = cryptoCoins[i].logoUrl;
                    cryptoCoinDetails.name = cryptoCoins[i].name;
                    cryptoCoinDetails.symbol = cryptoCoins[i].symbol;
                    //save crypto coin details
                    await cryptoCoinDetails.save();
                } else {
                    //create new crypto coin details with name, symbol and logoUrl and related crypto coin id
                    await CryptoCoinDetailsModel.create({ name: cryptoCoins[i].name, symbol: cryptoCoins[i].symbol, logoUrl: cryptoCoins[i].logoUrl, cryptoCoin: cryptoCoins[i]._id });
                }




            }
            res.status(200).json("All Crypto Coin Details Updated");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    togglePopularCryptoCoin: async (req, res) => {
        try {

            await CryptoCoinsModel.updateOne({ _id: req.params.id }, {
                $set: {
                    isPopular: req.body.isPopular
                }
            });

            let crypto = await CryptoCoinsModel.findById(req.params.id);
            let popularCrypto = await PopularCryptoModel.create({ cryptoCoin: crypto });
            res.status(200).json(popularCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateCryptoCoinsWithCryptoDetails: async (req, res) => {
        try {
            //get all crypto coins
            let cryptoCoins = await CryptoCoinsModel.find();
            //loop through all crypto coins

            for (let i = 0; i < cryptoCoins.length; i++) {
                //get crypto coin details from db via crypto coin id
                let cryptoCoinDetails = await CryptoCoinDetailsModel.findOne({ cryptoCoin: cryptoCoins[i]._id });
                //if crypto coin details exist
                if (cryptoCoinDetails) {
                    //update crypto coin details logoUrl with crypto coin logoUrl, name and symbol
                    cryptoCoins[i].marketCap = cryptoCoinDetails.marketCap ?? 0;
                    cryptoCoins[i].circulatingSupply = cryptoCoinDetails.circulatingSupply ?? 0;
                    cryptoCoins[i].totalSupply = cryptoCoinDetails.totalSupply ?? 0;
                    //save crypto coin details
                    await cryptoCoins[i].save();
                }
            }
            res.status(200).json("All Crypto Coin Details Updated");
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = CryptoCoinsController;