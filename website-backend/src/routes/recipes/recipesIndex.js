const express = require("express");
const allRecipes = require("./allRecipesRoute");
const individualRecipe = require("./individualRecipeRoute");

const app = express();
const path = "/recipes";

app.use(path, allRecipes);

app.use(path, individualRecipe);

module.exports = app;
