const UsersModel = require("../config/dbModels").UsersModel;
const RecipesModel = require("../config/dbModels").RecipesModel;

// All the functions return Promises for consistency

const updateOneEntryUsers = async (data, updateFields) => {
  try {
    const User = await UsersModel.updateOne(data, {
      $set: updateFields,
    });
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const updateMultipleEntriesUsers = async (data, updateFields) => {
  try {
    const User = await UsersModel.updateMany(data, {
      $set: updateFields,
    });
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const updateOneEntryRecipes = async (data, updateFields) => {
  try {
    const Recipe = await RecipesModel.updateMany(data, {
      $set: updateFields,
    });
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const updateMultipleEntriesRecipes = async (data, updateFields) => {
  try {
    const Recipe = await RecipesModel.updateMany(data, {
      $set: updateFields,
    });
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

module.exports = {
  updateOneEntryUsers,
  updateMultipleEntriesUsers,
  updateOneEntryRecipes,
  updateMultipleEntriesRecipes,
};
