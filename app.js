const express = require("express");
const logger = require("./utils/looger");
const ErrorRoute = require("./utils/error");
const morgan = require("morgan");
const app = express();
app.use(logger);
app.use(morgan("dev"));
app.use(ErrorRoute);
module.exports = app;
