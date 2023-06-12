const express = require("express");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/product-controller");
const { upload } = require("../middlewares/upload-middleware");

const router = express.Router();
// http://localhost:5000/api/product/add-product
router.route("/add-product").post(upload.single("image"), addProduct);
// http://localhost:5000/api/product
router.route("/").get(getAllProducts);
router.route("/:xx").get(getSingleProduct);
module.exports = router;
