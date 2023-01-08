const express = require("express");
const registerDeviceController = require("../Controllers/registerDeviceController");
const authController = require("../Controllers/authController");
const router = express.Router();

router.route("/").get(registerDeviceController.getAllRegisterDevice);

// router.route("/myfingerprint").get(Fingerprint2);

router
  .route("/:id")
  .get(registerDeviceController.getRegisterDevice)
  .patch(registerDeviceController.updateRegisterDevice)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    registerDeviceController.deleteRegisterDevice
  );

router
  .route("/register-device")
  .post(authController.protect, registerDeviceController.registerDevice);

module.exports = router;
