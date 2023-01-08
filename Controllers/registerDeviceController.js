const registerDevice = require("../Models/registerDeviceModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.registerDevice = catchAsync(async (req, res) => {
  const device = await registerDevice.create({
    user: req.user.id,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: device,
    },
  });
});

exports.getAllRegisterDevice = catchAsync(async (req, res) => {
  const device = await registerDevice.find();

  res.status(201).json({
    results: device.length,
    status: "success",
    data: {
      data: device,
    },
  });
});

exports.getRegisterDevice = catchAsync(async (req, res, next) => {
  const device = await registerDevice.findOne({ IMEI: req.params.id });
  if (!device) {
    return next(new AppError("There is no user with that ID", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: device,
    },
  });
});

exports.updateRegisterDevice = catchAsync(async (req, res, next) => {
  const doc = await registerDevice.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError(`No document found with that ID`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.deleteRegisterDevice = catchAsync(async (req, res, next) => {
  const user = await registerDevice.findByIdAndRemove(req.params.id);

  if (!user) {
    return next(new AppError(`No user found with that ID`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.fingerprintBiometric = catchAsync(async () => {});
