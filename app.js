const express = require("express");
const userRouter = require("./Routes/userRoutes");
const registeredDeviceRouter = require("./Routes/registeredDeviceRoutes");
const globalErrorHandler = require('./controllers/errorController');


const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();

app.use("/api/v1/users", jsonParser, userRouter);
app.use("/api/v1/device", jsonParser, registeredDeviceRouter);
app.use(globalErrorHandler);
module.exports = app;
