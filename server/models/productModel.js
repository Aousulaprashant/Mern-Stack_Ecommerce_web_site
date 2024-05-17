const mongoose = require("mongoose");

const ProductScema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true,
      required: true,
    },
    tittle: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      requirre: true,
    },
    description: {
      type: String,
      require: true,
    },
    images: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Boolean,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Products", ProductScema);
