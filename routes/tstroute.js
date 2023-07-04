const express = require("express");
const router = express.Router();
const {get,createUser, login} = require("../controllers/test")

router.route("/").get(get);
router.route("/signup").post(createUser)
router.route("/login").post(login)

module.exports = router;