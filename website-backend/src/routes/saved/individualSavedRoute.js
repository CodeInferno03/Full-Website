const express = require("express");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const { getOneEntryUsers } = require("../../utils/db_utils/getDBEntry");
const getDecodedCookieData = require("../../middleware/getDecodedCookieData");

const router = express.Router();

router.use(express.json());

router
  .route("/:recipeId([0-9a-fA-F]{24})/:recipeName")
  .get(restrictToLoggedInUser, async (req, res) => {
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    getOneEntryUsers({ username: `${decodedCookie.userName}` }).then(
      (result) => {
        if (result.success === false) {
          res.status(500).json({
            success: false,
            statusCode: res.statusCode,
            message: `Error retriving recipe! Please try again later!`,
            data: result,
          });
        } else {
          // searching for a matching recipeId in savedRecipes
          const correctSavedRecipe = result.savedRecipes.filter(
            (savedRecipe) => {
              savedRecipe.recipeData._id === req.params.recipeId;
            }
          );

          res.status(200).json({
            success: false,
            statusCode: res.statusCode,
            message: `Saved recipe retrieved successfully!`,
            data: correctSavedRecipe.recipeData,
          });
        }
      }
    );
  });

module.exports = router;
