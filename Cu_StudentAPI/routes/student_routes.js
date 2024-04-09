const express = require("express");
const router = express.Router();
const {
  secondYear,
  secondYearTesting,
} = require("../controllers/student_connections.js");

router.route("/").get(secondYear);
router.route("/testing").get(secondYearTesting);
module.exports = router;
