const UserRoleModel = require('../models/userRole.model');
const RoleModel = require('../models/role.model')

let UserRoleController = {
    getAll: async (req, res) => {
        try {
            let userroles = await UserRoleModel.find();
            res.status(200).json(userroles);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let userrole = await UserRoleModel.findById(req.params.id);
            res.status(200).json(userrole);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByUserId: async (req, res) => {
        try {
            let userrole = await UserRoleModel.find({user: req.params.id})
            const role = await RoleModel.findById(userrole[0].role)
            res.status(200).json(role);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    getAllByRoleId: async (req, res) => {
        try {
            let userroles = await UserRoleModel.find({roleId: req.params.roleId});
            res.status(200).json(userroles);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let userrole = await UserRoleModel.create(req.body);
            res.status(200).json(userrole);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let userrole = await UserRoleModel.findByIdAndUpdate(req.params.id , req.body , { new: true });
            res.status(200).json(userrole);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let userrole = await UserRoleModel.findByIdAndDelete(req.params.id);
            res.status(200).json(userrole);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}

module.exports = UserRoleController;