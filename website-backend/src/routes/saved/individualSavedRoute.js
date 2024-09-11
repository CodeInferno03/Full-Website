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
              return savedRecipe.recipeData._id === req.params.recipeId
                ? savedRecipe
                : [];
            }
          );

          if (correctSavedRecipe.length === 0) {
            res.status(404).json({
              success: false,
              statusCode: res.statusCode,
              message: `Recipe not found!`,
              data: null,
            });
          } else {
            res.status(200).json({
              success: true,
              statusCode: res.statusCode,
              message: `Saved recipe retrieved successfully!`,
              data: correctSavedRecipe[0].recipeData,
            });
          }
        }
      }
    );
  });

module.exports = router;
