const mongoose = require('mongoose');
const UserModel = require('./user.model');
const CryptoCoinsModel = require('./cryptoCoins.model');
const { Schema, model } = mongoose;

const userCryptoListSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        crypto: {
            type: Schema.Types.ObjectId,
            ref: "Crypto"
        }
    },
    {
        timestamps: true,
    }
);

userCryptoListSchema.statics.createWithUserAndCrypto = async function (params) {
    let user = await UserModel.findById(params.userId);
    let crypto = await CryptoCoinsModel.findById(params.cryptoId);
    if (user && crypto) {
        let userCrypto = await this.create({ user: user, crypto: crypto });
        return userCrypto;
    }
    return null;
};

const UserCryptoListModel = model("UserCryptoList", userCryptoListSchema);

module.exports = UserCryptoListModel;