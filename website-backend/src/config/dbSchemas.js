const mongoose = require('mongoose');

exports.UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  profilePicture: {
    type: String,
    required: false,
    unique: false,
  },
  savedRecipes: {
    type: Array,
    required: false,
    unique: false,
  },
  createdAt: {
    type: String,
    required: true,
    unique: false,
  },
  updatedAt: {
    type: String,
    required: true,
    unique: false,
  },
});

exports.RecipesSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    unique: false,
  },
  recipeCreator: {
    type: String,
    required: true,
    unique: false,
  },
  recipePicture: {
    type: String,
    required: false,
    unique: false,
  },
  recipeTimeTaken: {
    type: Number,
    required: true,
    unique: false,
  },
  recipeIngredients: {
    type: new mongoose.Schema({
      ingredientName: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    }),
    required: true,
    unique: false,
  },
  recipeSteps: {
    type: Array,
    required: true,
    unique: false,
  },
  createdAt: {
    type: String,
    required: true,
    unique: false,
  },
  updatedAt: {
    type: String,
    required: true,
    unique: false,
  },
});
