const express = require("express");
const allSaved = require("./allSavedRoute");
const individualSaved = require("./individualSavedRoute");

const app = express();
const path = "/recipes/saved-recipes";

app.use(path, allSaved);

app.use(path, individualSaved);

module.exports = app;
