const UserPreferencesModel = require('../models/userPreferences.model');

let UserPreferencesController = {
    getAll: async (req, res) => {
        try {
            let userPreferences = await UserPreferencesModel.find();
            res.status(200).json(userPreferences);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAllFromUser: async (req, res) => {
        try {
            let userPreferences = await UserPreferencesModel.find({user: req.params.user});
            res.status(200).json(userPreferences);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let userPreference = await UserPreferencesModel.findById(req.params.id);
            res.status(200).json(userPreference);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    createWithUserAndPreference: async (req, res) => {
        try {
            let userPreference = await UserPreferencesModel.createWithUserAndPreference({userId: req.params.userId, theme: req.params.theme, language: req.params.language});
            res.status(200).json(userPreference);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let userPreference = await UserPreferencesModel.findByIdAndUpdate(req.params.id, {preference: req.params.preference})
            res.status(200).json(userPreference)
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports = UserPreferencesController;