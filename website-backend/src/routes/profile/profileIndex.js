const express = require('express');
const profileChangePassword = require('./profileChangePasswordRoute');
const profile = require("./profileRoute");

const app = express();
const path = "/profile"

app.use(path, profile);

app.use(path, profileChangePassword);

module.exports = app;