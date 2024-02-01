const mongoose = require('mongoose');
const UserModel = require('./user.model');
const KeywordsModel = require('./keywords.model');

const { Schema, model } = mongoose;

const userKeywordsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        keyword: {
            type: Schema.Types.ObjectId,
            ref: "Keywords"
        }
    },
    {
        timestamps: true,
    }
);

userKeywordsSchema.statics.createWithUserAndKeyword = async function (data) {
    let user = await UserModel.findById(data.userId);
    let keyword = await KeywordsModel.findById(data.keywordId);
    if (user && keyword) {
        let userKeyword = await this.create({ user: user, keyword: keyword });
        return userKeyword;
    }
    return null;
};


const UserKeywordsModel = model("UserKeywords", userKeywordsSchema);

module.exports = UserKeywordsModel;