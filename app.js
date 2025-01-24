const express = require("express");
const cors = require("cors");
const logger = require("./utils/looger");
const ErrorRoute = require("./utils/error");
const morgan = require("morgan");
const userRouter = require("./routes/userroutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use("/user", userRouter);
app.use(morgan("dev"));

app.use(ErrorRoute);
module.exports = app;
