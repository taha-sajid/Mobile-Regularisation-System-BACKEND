const User = require("../Models/userModel");

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

exports.getUser = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        data: users,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "There is no user in our database with that ID",
    });
  }
};

exports.registerDevice = (req, res) => {
  res.status(200).json({
    status: "Success",
    data: {
      message: "you successfully hit the server",
    },
  });
};
