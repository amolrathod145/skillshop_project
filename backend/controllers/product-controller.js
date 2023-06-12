const product = require("./../models/product-model");
exports.addProduct = async (req, res) => {
  try {
    const result = await product.create(req.body);
    res.json({
      success: true,
      message: "prodcut added",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error ${error}`,
    });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const result = await product.find();
    res.json({
      count: result.length,
      success: true,
      message: "All prodcuts",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error ${error}`,
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const { xx } = req.params;
    console.log(xx);
    const result = await product.findById(xx);
    res.json({
      count: result.length,
      success: true,
      message: "All prodcuts",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error ${error}`,
    });
  }
};
