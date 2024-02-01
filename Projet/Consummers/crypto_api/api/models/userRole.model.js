const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const userroleSchema = new Schema(
    {
        role: {
            type: Schema.Types.ObjectId,
            ref: "Role"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into DB

const UserModel = model("Userrole", userroleSchema);

module.exports = UserModel;