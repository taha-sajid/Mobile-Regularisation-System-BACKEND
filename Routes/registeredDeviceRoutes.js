const express = require("express");
const registeredDeviceController = require("../Controllers/registeredDeviceController");
const router = express.Router();

router
  .route("/register-device")
  // .post(registeredDeviceController.registeredDevice);

module.exports = router;
