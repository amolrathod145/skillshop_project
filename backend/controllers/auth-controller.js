const user = require("./../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const address = require("./../models/addrss");
const crypto = require("crypto")
const { sendEmail } = require("../utils/email")
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await user.findOne({ email });
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    //   email bhetla
    const verify = await bcrypt.compare(
      password,
      result.password
    );
    if (!verify) {
      return res.json({
        success: false,
        message: "password do not match",
      });
    }
    const token = jwt.sign(
      {
        id: result._id,
      },
      process.env.JWT_KEY
    );
    const addr = await address.findOne({
      userId: result._id,
    });
    res.json({
      succes: true,
      message: "shabbash",
      result: {
        email: result.email,
        name: result.name,
        token,
        address: addr,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Error ${error}`,
    });
  }
};
exports.loginWithGoogle = async (req, res) => {
  try {
    const { token } = req.body;
    const client = new OAuth2Client();
    const result = await client.verifyIdToken({
      audience: process.env.GOOGLE_CLIENT_ID,
      idToken: token,
    });
    console.log(result);
    const { name, email, picture } = result.getPayload();
    res.json({
      success: true,
      message: "logged in",
      result: { name, email, picture },
    });
  } catch (error) {
    res.json({
      success: false,
      error: "" + error,
    });
  }
};
exports.passwordReset = async (req, res) => {
  try {
    const { email } = req.body
    const result = await user.findOne({ email })
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }
    const token = crypto.randomBytes(15).toString("hex");
    const expireAt = new Date(Date.now() + 5 * 60000)
    await user.findByIdAndUpdate(result._id, { resetToken: token, expireAt, })
    // const link = `http://localhost:5000/api/auth/password-reset/${result._id}/${token}`
    const link = `http://localhost:3000/user/password-reset/${result._id}/${token}`
    console.log(link)
    const str = `follow this link to reset your Password
    ${link}
    this link is valid for one time use

    SKillHub
    `

    sendEmail(email, "Password Reset Kar 🔐", str)
    // email sapdla so send email
    res.json({
      success: true,
      message: "password reset link send",
    });
  } catch (error) {
    res.json({
      success: false,
      error: "" + error,
    });
  }
};

exports.validateIdToken = async (req, res) => {
  try {
    const result = await user.findById(req.body.id);
    console.log(req.body);
    if (!result) {
      return res.json({
        success: false,
        message: "user not found"
      })
    }
    if (!(new Date(result.expireAt).getTime() > Date.now())) {
      console.log("invalid Link")
      return res.json({
        success: false,
        message: "Link Expire Zale ahe Please Tray another Link"
      })
    }
    if (result.resetToken === "") {
      return res.json({
        success: false,
        message: "Token Expired",
      })
    }
    if (result.resetToken !== req.body.token) {
      return res.json({
        success: false,
        message: "Invalid Token"
      })
    }
    res.json({
      success: true,
      message: "user Validation Success"
    })
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`
    })
  }
}
exports.UpdatePassword = async (req, res) => {
  try {
    const data = await user.findById(req.body.id);
    if (!data) {
      return res.json({
        success: false,
        message: "invalid User"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.password, salt)
    const result = await user.findByIdAndUpdate(
      req.body.id,
      {
        resultToken: "",
        password: newPass
      }, { new: true }
    )
    res.json({
      success: true,
      message: "Password Update Success",
    })
  } catch (error) {
    res.json({
      success: false,
      message: `error ${error}`
    })
  }
}