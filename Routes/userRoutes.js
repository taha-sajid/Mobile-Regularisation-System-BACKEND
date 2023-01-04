const express = require("express");
const userController = require("../Controllers/userController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/login").post(authController.login);
router.route("/signup").post(authController.signUp);

router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);

// PROTECTED ROUTES
router.use(authController.protect);

router.patch("/updateMyPassword", authController.updatePassword);
// router.get("/me", userController.getMe, userController.getUser);
// router.patch("/updateMe", userController.updateMe);
// router.delete("/deleteMe", userController.deleteMe);

router
  .route("/")
  .get(authController.restrictTo("admin"), userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(authController.restrictTo("admin"), userController.deleteUser);

module.exports = router;
