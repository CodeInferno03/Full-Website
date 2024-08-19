// functions to make entries into both DBs
const Models = require('../config/dbModels');

exports.makeUsersDBEntry = async (data) => {
    try {
        const User = new Models.UsersModel(data);
        await User.save();
    } catch (err) {
        console.log(`Error making entry in Users collection.\n${err}`);
    }
}

exports.makeRecipesDBEntry = async (data) => {
    try {
        const Recipe = new Models.RecipesModel(data);
        await Recipe.save();
    } catch (err) {
        console.log(`Error making entry into Recipes collection.\n${err}`);
    }
}