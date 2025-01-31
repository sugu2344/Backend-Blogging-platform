const express = require("express");
const cors = require("cors");
const logger = require("./utils/looger");
const ErrorRoute = require("./utils/error");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userroutes");
const postRouter = require("./routes/postroutes");
const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(logger);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use(morgan("dev"));

app.use(ErrorRoute);
module.exports = app;
