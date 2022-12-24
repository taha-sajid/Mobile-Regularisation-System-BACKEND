const mongoose = require("mongoose");
const validator = require("validator");

const registeredDeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  CNIC: {
    type: Number,
    required: [true, "Please tell us your CNIC number"],
    unique: true,
  },
  IMEI: {
    type: Number,
    required: [true, "Please enter your IMEI number"],
    unique: true,
  },
  // user: {
  //   type: mongoose.Schema.objectId,
  //   ref: "User",
  //   required: [true, "Device must belong to a user"],
  // },
});

const registeredDevice = mongoose.model(
  "RegisteredDevice",
  registeredDeviceSchema
);

module.exports = registeredDevice;
