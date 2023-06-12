const Razorpay = require("razorpay");
const crypto = require("crypto");
const product = require("./../models/product-model");
const { sendSms } = require("./../utils/sms");
exports.payment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_KEY,
    });

    // console.log(req.body);

    // 6229d28f54e2aba9c0877956
    // 622c68c6c26fce070403eb76
    const result = await product
      .find({
        _id: {
          $in: [
            "6229d28f54e2aba9c0877956",
            "622c68c6c26fce070403eb76",
          ],
        },
      })
      .select("price");
    console.log(result);
    const option = {
      // amount: req.body.amount * 100,
      amount: 500 * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(option);

    if (!order) {
      return res.json({
        success: false,
        message: "error unable to process payment",
      });
    }
    sendSms("9284123374", "order palced");
    res.json({
      success: true,
      message: "payment success",
      order,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "error " + error,
    });
  }
};
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      orderCreationId,
    } = req.body;

    const shasum = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY
    );
    shasum.update(
      `${orderCreationId}|${razorpay_payment_id}`
    );
    const digest = shasum.digest("hex");
    if (digest !== razorpay_signature) {
      return res.json({
        success: false,
        error: "kuch to gadbad hai daya",
      });
    }

    // db entry
    res.json({
      success: true,
      message: "payment Success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res.json({
      success: false,
      error: "" + error,
    });
  }
};
