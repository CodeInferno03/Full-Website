const UsersModel = require("../../config/dbModels").UsersModel;
const RecipesModel = require("../../config/dbModels").RecipesModel;

// All the functions return Promises for consistency

const getOneEntryUsers = async (data) => {
  try {
    const User = await UsersModel.findOne(data);
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const getMultipleEntriesUsers = async (data) => {
  try {
    const User = await UsersModel.find(data);
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const getOneEntryRecipes = async (data) => {
  try {
    const Recipe = await RecipesModel.findOne(data);
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const getMultipleEntriesRecipes = async (data) => {
  try {
    const Recipe = await RecipesModel.find(data);
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

module.exports = {
  getOneEntryUsers,
  getMultipleEntriesUsers,
  getOneEntryRecipes,
  getMultipleEntriesRecipes,
};
