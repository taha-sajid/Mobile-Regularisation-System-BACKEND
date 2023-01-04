const express = require("express");
const registerDeviceController = require("../Controllers/registerDeviceController");
const router = express.Router();

router.route("/").get(registerDeviceController.getAllRegisterDevice);

// router.route("/myfingerprint").get(Fingerprint2);

router
  .route("/:id")
  .get(registerDeviceController.getRegisterDevice)
  .patch(registerDeviceController.updateRegisterDevice)
  .delete(registerDeviceController.deleteRegisterDevice);

router.route("/register-device").post(registerDeviceController.registerDevice);

module.exports = router;
