const RoleModel = require('../models/role.model');

let RoleController = {
    getAll: async (req, res) => {
        try {
            let roles = await RoleModel.find();
            res.status(200).json(roles);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let role = await RoleModel.findById(req.params.id);
            res.status(200).json(role);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByName: async (req, res) => {
        try {
            let role = await RoleModel.findOne({name: req.params.name});
            res.status(200).json(role);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let role = await RoleModel.create(req.body);
            res.status(200).json(role);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let role = await RoleModel.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
            res.status(200).json(role);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            let role = await RoleModel.findByIdAndDelete(req.params.id);
            res.status(200).json(role);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
