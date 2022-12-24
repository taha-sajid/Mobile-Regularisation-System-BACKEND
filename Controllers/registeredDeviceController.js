const registeredDevice = require("../Models/registeredDeviceModel");

exports.registeredDevice = async (req, res) => {
  try {
    const device = await registeredDevice.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        data: device,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
