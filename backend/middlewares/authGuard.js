const jwt = require("jsonwebtoken");
exports.protcted = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        success: false,
        message: "tokan kon pathvel??",
      });
    }
    jwt.verify(
      req.headers.authorization,
      process.env.JWT_KEY
    );
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "invalid token",
      error,
    });
  }
};
