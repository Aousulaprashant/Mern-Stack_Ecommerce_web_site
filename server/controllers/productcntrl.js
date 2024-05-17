const Product = require("../models/productModel");

//FILETERING , SORTING AND PAGINATION

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((eL) => delete queryObj[eL]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productcntrl = {
  getProducts: async (req, res) => {
    try {
      console.log(req.query);
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .pagination();

      const products = await features.query;

      if (!products) {
        return res.status(400).json({ msg: "Product empty" });
      }

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message, ss: "Ss" });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        tittle,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      const product = await Product.findOne({ product_id });
      const newProduct = await Product({
        product_id,
        tittle: tittle.toLowerCase(),
        content,
        price,
        description,
        images,
        category,
      });

      await newProduct.save();

      return res.status(200).json({
        msg: "sucessfull  product created",
        product: newProduct,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        from: "productcntl.js createProduct function ",
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { tittle, price, description, content, images, category } =
        req.body;

      if (!images) return res.status(500).json({ msg: "No image uploded" });

      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          tittle: tittle.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      res.json({ msg: "file updated sucessfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productcntrl;
