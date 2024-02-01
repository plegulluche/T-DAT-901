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
            maxLenght: 500,
            unique: false,
            trim: true
        },
        marketCap: {
            type: Number,
            require: false,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        totalSupply: {
            type: Number,
            require: false,
            maxLenght: 40,
            unique: false,
            trim: true
        },
        circulatingSupply: {
            type: Number,
            require: false,
            maxLenght: 40,
            unique: false,
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