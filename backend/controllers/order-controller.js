const order = require("./../models/order-model");
const jwt = require("jsonwebtoken");
exports.placeOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_KEY
    );
    const result = await order.create({
      userId: id,
      ...req.body,
    });
    res.json({
      success: true,
      message: "order placed",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const result = await order.find();
    res.json({
      count: result.length,
      success: true,
      message: "all orders ",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};
exports.deleteOrders = async (req, res) => {
  try {
    await order.deleteMany();
    res.json({
      success: true,
      message: "order deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`,
    });
  }
};
