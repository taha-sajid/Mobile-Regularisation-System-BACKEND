const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// const createSendToken = (user, statusCode, res) => {
//   const token = signToken(user._id);
//   const cookieOptions = {
//     expires: new Date(
//       Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   if (process.env.NODE_ENV === "prodution") cookieOptions.secure = true;
//   res.cookie("jwt", token, cookieOptions);

//   // remove password from the output
//   user.password = undefined;
//   res.status(statusCode).json({
//     status: "success",
//     token,
//     data: {
//       user,
//     },
//   });
// };

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    // res.status(401).json({
    //   status: "fail",
    //   data: {
    //     message: "Incorrect email or password",
    //   },
    // });
    return next(new AppError("Incorrect email or password", 401));
  }
  //   createSendToken(user, 200, res);
});

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    console.log(req.body);
    const token = signToken(newUser._id);
    console.log(req.body);
    res.status(201).json({
      status: "success",
      token,
      data: {
        data: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.protect = async (req, res, next) => {
  //   1) Get token and check whether it is there or not
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in! Please logged in to get access.",
      });
    }

    //   2) Verification of Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded, token);

    // 3) check if user still exist

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "fail",
        message: "The user belonging to this token is no longer exist",
      });
    }
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: err,
    });
  }
  //   4) Check if user changed password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "fail",
      message: "User recently changed password please login again",
    });
  }

  //   GRANT ACCESS TO THE PROTECTED ROUTE
  req.user = freshUser;
  next();
};
