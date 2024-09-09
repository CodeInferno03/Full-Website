const express = require('express');

const allCreated = require("./allCreatedRoute");
const createRecipe = require("./createRecipe");
const individualCreated = require("./individualCreatedRoute");
const updateCreated = require("./updateCreatedRoute");

const app = express();
const path = "/recipes/created-recipes";

app.use(path, allCreated);

app.use(path, individualCreated);

app.use(path, createRecipe);

app.use(path, updateCreated);

module.exports = app;
