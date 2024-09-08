const express = require("express");
const { getOneEntryRecipes, getOneEntryUsers } = require("../../../utils/db_utils/getDBEntry");
const { updateOneEntryUsers } = require("../../../utils/db_utils/updateDBEntry");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use(express.json());

router
  .route("/recipes/:recipeId/:recipeName") // recipename either with `-` or `_` as delimiter
  .get(async (req, res) => {
    try {
      const recipeDetails = await getOneEntryRecipes({
        _id: `${req.params.recipeId}`,
      });
      res.json({
        success: true,
        statusCode: res.statusCode,
        message: "recipe data retrieved successfully",
        data: recipeDetails,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: err,
        data: null,
      });
    }
  }).put(restrictToLoggedInUser, async (req, res) => {
    // NEED TO TEST
    // req.body should contain all the recipe data, not just the id
    const accessToken = req.cookies.access_token;
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
   
    const userSavedRecipes = await getOneEntryUsers({ _id: `${decoded.userId}` }).savedRecipes;
    const savedTime = Date.now();
    userSavedRecipes.push({
      recipeData: req.body,
      savedAt: savedTime
    });

    updateOneEntryUsers({ _id: `${decoded.userId}` }, userSavedRecipes).then((result) => {
      if (result.success !== false) {
        res.status(201).json({
          success: true,
          statusCode: res.statusCode,
          message: 'saved recipes updated',
          data: result,
        });
      } else {
        res.status(400).json({
          success: false,
          statusCode: res.statusCode,
          message: result.message,
          data: null,
        });
      }
    });

  });

module.exports = router;
