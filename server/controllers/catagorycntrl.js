const Category = require("../models/catagoryModel");

const catagorycntrl = {
  getcotagory: async (req, res) => {
    try {
      const catagory = await Category.find();
      res.json(catagory);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createcatagory: async (req, res) => {
    try {
      const { name } = req.body;
      const catagory = await Category.findOne({ name });

      if (catagory)
        return res.status(400).json({ ms: "category Already Exiets" });

      const newCategory = await Category.create({ name });
      await newCategory.save();

      res.json({ msg: "Catagory created sucessfully !! " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deletecatagory: async (req, res) => {
    try {
      await Category.findOneAndDelete(req.params.id);
      res.json({ msg: "Catagory deleted sucessfully !! " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  Update: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Catagory updated sucessfully !! ", name: name });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = catagorycntrl;
