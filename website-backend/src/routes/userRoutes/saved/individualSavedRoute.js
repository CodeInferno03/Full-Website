const express = require("express");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const { getOneEntryUsers } = require("../../../utils/db_utils/getDBEntry");

const router = express.Router();

router.use(express.json());

router
  .route("/:userName/saved-recipes/:recipeId/:recipeName")
  .get(restrictToLoggedInUser, (req, res) => {
    getOneEntryUsers({ username: `${req.params.userName}` }).then((result) => {
      if (result.success === false) {
        res.status(500).json({
          success: false,
          statusCode: res.statusCode,
          message: `Error retriving recipe! Please try again later!`,
          data: result,
        });
      } else {
        // searching for a matching recipeId in savedRecipes
        const correctSavedRecipe = result.savedRecipes.filter((savedRecipe) => {
          savedRecipe._id === req.params.recipeId;
        });

        res.status(200).json({
          success: false,
          statusCode: res.statusCode,
          message: `Saved recipe retrieved successfully!`,
          data: correctSavedRecipe,
        });
      }
    });
  });

module.exports = router;
