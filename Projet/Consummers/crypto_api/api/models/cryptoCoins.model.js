const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cryptoCoinsSchema = new Schema(
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
        logoUrl: {
            type: String,
            require: false,
            maxLenght: 500,
            unique: true,
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
        isPopular: {
            type: Boolean,
            require: false,
        },
    },
    {
        timestamps: true,
    }
);

const CryptoCoinsModel = model("CryptoCoins", cryptoCoinsSchema);

module.exports = CryptoCoinsModel;