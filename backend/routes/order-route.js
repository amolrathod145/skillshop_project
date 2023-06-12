const express = require("express");
const {
  placeOrder,
  deleteOrders,
  getAllOrders,
} = require("../controllers/order-controller");
const {
  payment,
  verifyPayment,
} = require("../controllers/payment-controller");
const { protcted } = require("../middlewares/authGuard");

const router = express.Router();
router
  .route("/")
  .get(getAllOrders)
  .post(protcted, placeOrder)
  .delete(deleteOrders);
router.route("/payment").post(protcted, payment);
router
  .route("/payment/verify")
  .post(protcted, verifyPayment);

module.exports = router;
