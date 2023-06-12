const express = require("express");
const {
  login,
  loginWithGoogle,
  passwordReset,
  UpdatePassword,
  validateIdToken,
} = require("../controllers/auth-controller");

const router = express.Router();
router.route("/login").post(login);
router.route("/login/google").post(loginWithGoogle);
router.route("/password-reset").post(passwordReset);
router.route("/update-password").post(UpdatePassword);
router.route("/validate-reset-password").post(validateIdToken);

module.exports = router;
