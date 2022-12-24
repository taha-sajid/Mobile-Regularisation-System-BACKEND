const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/").get(authController.protect, userController.getAllUsers);

router.route("/:id").get(userController.getUser);

router.route("/login").post(authController.login);
// router.post("/signup", signup);

router
  .route("/sign-up")
  //   .get(userController.getAllUsers)
  .post(authController.signUp);

module.exports = router;
