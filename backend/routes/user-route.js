const express = require("express");
const { protcted } = require("../middlewares/authGuard");
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  addAddress,
} = require("./../controllers/user-controller");
const router = express.Router();
router.route("/signup").post(createUser);
router.route("/").get(getAllUsers);
router.route("/:id").put(updateUser).delete(deleteUser);

router.route("/address").post(protcted, addAddress);
module.exports = router;
