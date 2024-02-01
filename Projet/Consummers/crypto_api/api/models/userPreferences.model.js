const mongoose = require('mongoose');
const UserModel = require('./user.model');
const { Schema, model } = mongoose;


const userPreferencesSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        theme: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        },
        language: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

userPreferencesSchema.statics.createWithUserAndPreference = async function (userId, theme, language) {
    const user = await UserModel.findById(userId);
    if (user) {
        //a definir check sur theme et language
        const userPreference = await this.create({ user: user, theme: theme, language: language });
        return userPreference;
    }
    return null;
};

// play function before save into DB

const UserPreferencesModel = model("UserPreferences", userPreferencesSchema);

module.exports = UserPreferencesModel;