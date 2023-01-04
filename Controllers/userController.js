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
  if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("There is no user with that ID", 400));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: user,
      },
    });
  }
  return next(
    new AppError("Please provide a valid ID to get your required data", 400)
  );
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError(`No user found with that ID`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
