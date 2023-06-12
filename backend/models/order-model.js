const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    mode: {
      type: String,
      required: true,
      enum: ["cod", "online"],
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },
        qty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("order", orderSchema);
