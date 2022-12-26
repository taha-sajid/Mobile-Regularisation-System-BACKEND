const AppError = require("../utils/appError");

const handleJWTError = () =>
  new AppError("Invalid token, please log in again", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired, please log in again", 401);

const handleDuplicateEmail = () =>
  new AppError("This email is already exist", 400);

const sendErrorDev = (err, res) => {
  console.log(err.keyValue);
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // operational trusted error: send message to client
  if (err.isOperational || err.code === 11000) {
    res.status(err.statusCode).json({
      status: err.status,
      message: `${err.message}`,
    });

    // programming or other unknown error: send message to client
  } else {
    // 1) ERROR
    console.error("ERROR 💥", err);
    res.status(500).json({
      status: "error",
      message: "Something went very wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    if (error.code == 11000 && error.keyValue.email === req.body.email)
      error = handleDuplicateEmail();

    sendErrorProd(error, res);
  }
};
