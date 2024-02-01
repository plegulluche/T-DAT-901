const UserCryptoListModel = require('../models/userCryptoList.model');
const UserModel = require('../models/user.model');
const CryptoCoinsModel = require('../models/cryptoCoins.model');


let UserCryptoListController = {
    getAll: async (req, res) => {
        try {
            let userCryptoList = await UserCryptoListModel.find();
            res.status(200).json(userCryptoList);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllFromUser: async (req, res) => {
        try {
            let tab = []
            let user = await UserModel.findById(req.params.id);
            let userCryptoList = await UserCryptoListModel.find({user: user});
            for (let i=0; i < userCryptoList.length; i++) {
                let crypto = await CryptoCoinsModel.findById(userCryptoList[i].crypto.toString())
                tab.push(crypto)
            }
            res.status(200).json(tab);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let userCrypto = await UserCryptoListModel.findById(req.params.id);
            res.status(200).json(userCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createWithUserAndCrypto: async (req, res) => {
        try {
            let userCrypto = await UserCryptoListModel.createWithUserAndCrypto({userId: req.params.userId, cryptoId: req.params.cryptoId});
            res.status(200).json(userCrypto);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let userCrypto = await UserCryptoListModel.findByIdAndUpdate(req.params.id, {crypto: req.params.crypto})
            res.status(200).json(userCrypto)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteById: async (req, res) => {
        try {
            const crypto = await CryptoCoinsModel.findById(req.params.id)
            let userCrypto = await UserCryptoListModel.findOneAndDelete({crypto: crypto._id});
            res.status(200).json(userCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteByName: async (req, res) => {
        try {
            let userCrypto = await UserCryptoListModel.findOneAndDelete({crypto: req.params.crypto});
            res.status(200).json(userCrypto);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserCryptoListController;