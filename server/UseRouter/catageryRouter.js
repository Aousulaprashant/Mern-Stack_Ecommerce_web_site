const router = require("express").Router();
const catagertcnt = require("../controllers/catagorycntrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/catagory")
  .get(catagertcnt.getcotagory)
  .post(auth, authAdmin, catagertcnt.createcatagory);
// .delete(auth, authAdmin, catagertcnt.deletecatagory);

router
  .route("/catagory/:id")
  .delete(auth, authAdmin, catagertcnt.deletecatagory)
  .put(auth, authAdmin, catagertcnt.Update);

module.exports = router;
