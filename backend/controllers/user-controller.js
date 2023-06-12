const user = require("./../models/user-model");
const bcrypt = require("bcryptjs");
const address = require("./../models/addrss");
const jwt = require("jsonwebtoken")
exports.createUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(
      req.body.password,
      salt
    );
    const result = await user.create({
      ...req.body,
      password,
    });
    res.json({
      success: true,
      message: "user created",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured",
      error: `Error ${error}`,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const result = await user.find();
    res.json({
      count: result.length,
      success: true,
      message: "All users",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured",
      error: `Error ${error}`,
    });
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(
        req.body.password,
        salt
      );
    }
    const result = await user.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json({
      success: true,
      message: "user updated",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured",
      error: `Error ${error}`,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const result = await user.findByIdAndDelete(
      req.params.id
    );
    res.json({
      success: true,
      message: "user deleted",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured",
      error: `Error ${error}`,
    });
  }
};
exports.addAddress = async (req, res) => {
  /*
  userId
  house
  street
  city
  pin
  */
  const { id } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_KEY
  );
  const result = await address.create({
    userId: id,
    ...req.body,
  });
  try {
    res.json({
      success: true,
      message: "addres added ",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error Occured",
      error: `Error ${error}`,
    });
  }
};
