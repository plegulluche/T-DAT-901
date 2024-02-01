const KeywordsModel = require('../models/keywords.model');

let KeywordsController = {
    getAll: async (req, res) => {
        try {
            let keywords = await KeywordsModel.find();
            res.status(200).json(keywords);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOne: async (req, res) => {
        try {
            let keyword = await KeywordsModel.findById(req.params.id);
            res.status(200).json(keyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getOneByName: async (req, res) => {
        try {
            let keyword = await KeywordsModel.findOne({keyword: req.params.keyword});
            res.status(200).json(keyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            let keyword = await KeywordsModel.create(req.body);
            res.status(200).json(keyword);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            let keyword = await KeywordsModel.findByIdAndUpdate(req.params.id, {keyword:req.params.keyword})
            res.status(200).json(keyword)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteById: async (req, res) => {
        try {
            let keyword = await KeywordsModel.findByIdAndDelete(req.params.id);
            res.status(200).json(keyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteByName: async (req, res) => {
        try {
            let keyword = await KeywordsModel.findOne({keyword: req.params.keyword});
            keyword = await KeywordsModel.findByIdAndDelete(keyword._id);
            res.status(200).json(keyword);
        } catch (err) {
            res.status(500).json(err);
        }
    },
} 

module.exports = KeywordsController;