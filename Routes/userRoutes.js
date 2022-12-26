const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/sign-up").post(authController.signUp);

// PROTECTED ROUTES
router.use(authController.protect);

router.route("/").get(userController.getAllUsers);
router.route("/:id").get(userController.getUser);

module.exports = router;
