const mongoose = require('mongoose');
const RoleModel = require('../models/role.model');
const UserRoleModel = require('./userRole.model');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            minLength: 3,
            maxLenght: 25,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            require: true,
            max: 1024,
            minLength: 6,
        },
        configCount: {
            type: Number,
            default: 10,
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into DB
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

userSchema.statics.createWithRole = async function(body) {
    const user = await this.create(body);
    const role_user = await RoleModel.findOne({description: 'user'});
    const userrole = await UserRoleModel.create({user: user._id, role: role_user._id});
    return user;
}

userSchema.statics.getUserRoles = async function(userId) {
    const user = await this.findById(userId);
    const userRoles = await UserRoleModel.find({user: user._id});
    let roles = [];
    for (let i = 0; i < userRoles.length; i++) {
        let role = await RoleModel.findById(userRoles[i].role);
        roles.push({roleId: role._id, description: role.description});
    }
    return roles;
}
//

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;