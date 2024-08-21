const UsersModel = require("../../config/dbModels").UsersModel;
const RecipesModel = require("../../config/dbModels").RecipesModel;

// All the functions return Promises for consistency

const deleteOneEntryUsers = async (data) => {
  try {
    const User = await UsersModel.deleteOne(data);
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const deleteMultipleEntriesUsers = async (data) => {
  try {
    const User = await UsersModel.deleteMany(data);
    return User;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const deleteOneEntryRecipes = async (data) => {
  try {
    const Recipe = await RecipesModel.deleteOne(data);
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

const deleteMultipleEntriesRecipes = async (data) => {
  try {
    const Recipe = await RecipesModel.deleteMany(data);
    return Recipe;
  } catch (err) {
    return new Promise((resolve, reject) => {
      resolve({ success: false, message: err });
    });
  }
};

module.exports = {
  deleteOneEntryUsers,
  deleteMultipleEntriesUsers,
  deleteOneEntryRecipes,
  deleteMultipleEntriesRecipes,
};
