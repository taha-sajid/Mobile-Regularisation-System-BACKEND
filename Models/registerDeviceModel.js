const mongoose = require("mongoose");
const validator = require("validator");

const registerDeviceSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["boughten", "stolen"],
    default: "boughten",
  },
  // user: {
  //   type: mongoose.Schema.objectId,
  //   ref: "User",
  //   required: [true, "Device must belong to a user"],
  // },
});

const registerDevice = mongoose.model("RegisterDevice", registerDeviceSchema);

module.exports = registerDevice;
