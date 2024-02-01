const UserModel = require('../models/user.model');
const RoleModel = require('../models/role.model');
const UserRoleModel = require('../models/userRole.model');


let UserController = {
    getAll: async (req, res) => {
        console.log(process.env.WEBSITE_HOSTNAME)
        try {
            let users = await UserModel.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getUserRoles: async (req, res) => {
        try {
            let userRoles = await UserModel.getUserRoles(req.params.id);
            res.status(200).json(userRoles);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getUserConfigCount: async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id)
            if (!user.configCount) res.status(200).json(10)
            else res.status(200).json(user.configCount) 
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    addUserRoles: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            let roles = req.body.roles;
            let exists = false;

            for (let i = 0; i < roles.length; i++) {
                let role = await RoleModel.findOne({description: roles[i]});
                let currentRole = await UserRoleModel.findOne({user: user._id, role: role._id});
                if (!currentRole) {
                    let userrole = await UserRoleModel.create({user: user._id, role: role._id});
                } else {
                    exists = true;
                }
            }

            !exists ? res.status(200).json("User roles added") : res.status(200).json("User roles already exist");
            
        } catch (err) {
            res.status(500).json(err);
        }
    },
    removeUserRoles: async (req, res) => {
        try {
            let user = await UserModel.findById(req.params.id);
            let roles = req.body.roles;

            for (let i = 0; i < roles.length; i++) {
                let role = await RoleModel.findOne({description: roles[i]});
                let userrole = await UserRoleModel.findOneAndDelete({user: user._id, role: role._id});
            }
            res.status(200).json("User roles removed");
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            const user = await UserModel.create(req.body);
            res.status(200).json(user);
        }
        catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    updateConfigCount: async (req, res) => {
        try {
            let configCount = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).json(configCount);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let user = await UserModel.findByIdAndDelete(req.params.id);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserController;