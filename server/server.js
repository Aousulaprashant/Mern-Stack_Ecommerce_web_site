const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // allow requests from all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // allow these methods
    headers: ["Content-Type", "Authorization"], // allow these headers
  })
);
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "this is example" });
});

app.listen(PORT, () => {
  console.log("server is runing  ");
});

//Routers
app.use("/user", require("./UseRouter/router"));

app.use("/api", require("./UseRouter/catageryRouter"));
app.use("/api", require("./UseRouter/upload"));
app.use("/api", require("./UseRouter/productRouter"));

const URL = process.env.MONGOBD_URL;

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

//1S633UW3wuDH9P6N`
