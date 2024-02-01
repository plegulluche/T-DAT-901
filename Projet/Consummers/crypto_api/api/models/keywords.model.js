const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const keywordsSchema = new Schema(
    {
        keyword: {
            type: String,
            require: true,
            minLength: 2,
            maxLenght: 50,
            unique: false,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const KeywordsModel = model("Keywords", keywordsSchema);

module.exports = KeywordsModel;
