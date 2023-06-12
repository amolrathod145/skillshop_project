const express = require("express");
const { dummy } = require("../controllers/text-controller");

const router = express.Router();
router.route("/").get(dummy);
module.exports = router;