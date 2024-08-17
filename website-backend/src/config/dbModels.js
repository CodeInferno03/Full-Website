const mongoose = require('mongoose');
const schemas = require('./dbSchemas');

exports.UsersModel =
  mongoose.models.UsersModel || mongoose.model("users", schemas.UsersSchema);

exports.RecipesModel =
  mongoose.models.RecipesModel || mongoose.model("recipes", schemas.RecipesSchema);
