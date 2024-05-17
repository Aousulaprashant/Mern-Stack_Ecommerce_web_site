const router = require("express").Router();
const productcntrl = require("../controllers/productcntrl");

router
  .route("/products")
  .get(productcntrl.getProducts)
  .post(productcntrl.createProduct);

router
  .route("/products/:id")
  .delete(productcntrl.deleteProduct)
  .put(productcntrl.updateProduct);

module.exports = router;
