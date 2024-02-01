const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cryptoTradingPairSchema = new Schema({
    symbol: {
        type: String,
        required: true,
        unique: true
    },
    baseAsset: {
        type: String,
        required: true
    },
    quoteAsset: {
        type: String,
        required: true
    }
});

const cryptoCoinDetailsSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            maxLenght: 50,
            unique: false,
            trim: true
        },
        symbol: {
            type: String,
            require: true,
            maxLenght: 50,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            require: false,
            maxLenght: 2000,
            unique: false,
            trim: true
        },
        links: {
            type: Object,
            require: false,
            minLength: 2,
            maxLenght: 500,
            unique: false,
            trim: true
        },
        marketCap: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        totalSupply: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        circulatingSupply: {
            type: Number,
            require: false,
            minLength: 2,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        logoUrl: {
            type: String,
            require: false,
            maxLenght: 500,
            unique: true,
            trim: true
        },
        tradingPairs: [cryptoTradingPairSchema],
        cryptoCoin: {
            type: Schema.Types.ObjectId,
            ref: 'CryptoCoins',
            require: true,
        }
    },
    {
        timestamps: true,
    }
);

const CryptoCoinDetailsModel = model("CryptoCoinDetails", cryptoCoinDetailsSchema);

module.exports = CryptoCoinDetailsModel;