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
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  CNIC: {
    type: Number,
    required: [true, "Please tell us your CNIC number"],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Device must belong to a user"],
  },
});

registerDeviceSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  // this.populate({
  //   path: 'user',
  //   select: 'name photo',
  // });

  next();
});

const registerDevice = mongoose.model("RegisterDevice", registerDeviceSchema);

module.exports = registerDevice;
