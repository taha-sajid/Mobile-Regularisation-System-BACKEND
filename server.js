const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");

// Import config.env file with the help of dotenv package
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.set("strictQuery", true);
mongoose.set("useCreateIndex", true);
mongoose
  .connect(DB, {
    useNewUrlParser: true,  
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((con) => {
    console.log("Db Connection Successfull");
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `App running on ${process.env.NODE_ENV} environment at port ${port}`
  );
});
