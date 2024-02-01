const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const roleSchema = new Schema(
    {
        description: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

// play function before save into DB

const RoleModel = model("Role", roleSchema);

module.exports = RoleModel;