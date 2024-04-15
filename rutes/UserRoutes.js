const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userControllers");



router.route("/auth/login").post(userController.login);
router.route("/auth/register").post(userController.signup)
module.exports = router;
