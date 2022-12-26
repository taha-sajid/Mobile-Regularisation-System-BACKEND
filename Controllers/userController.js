const User = require("../Models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      data: users,
    },
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError("There is no user with that Id", 400));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.registerDevice = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      message: "you successfully hit the server",
    },
  });
};
