const { getMultipleEntriesUsers } = require("../utils/db_utils/getDBEntry");
const { updateOneEntryUsers } = require("../utils/db_utils/updateDBEntry");

const handleDeleteRecipe = async (deletedRecipeId) => {
  const allUsers = await getMultipleEntriesUsers({ __v: 0 });

  const hasDeletedRecipe = (savedRecipe) =>
    savedRecipe.recipeData._id === `${deletedRecipeId}`;

  const usersWithRecipeSaved = allUsers.filter((user) =>
    user.savedRecipes.some(hasDeletedRecipe)
  );
  const modifiedUsers = [];

  for (const newUser of usersWithRecipeSaved) {
    newUser.savedRecipes = newUser.savedRecipes.filter(
      (recipe) => recipe.recipeData._id !== deletedRecipeId
    );
    modifiedUsers.push(
      updateOneEntryUsers(
        { _id: `${newUser._id}` },
        { savedRecipes: newUser.savedRecipes }
      )
    );
  }

  const userDBUpdated = await Promise.all(modifiedUsers);
  return userDBUpdated;
};

module.exports = handleDeleteRecipe;
