const express = require("express");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const validateCookie = require("../../../middleware/validateCookie");
const getOneEntryUsers =
  require("../../../utils/db_utils/getDBEntry").getOneEntryUsers;
const makeRecipesDBEntry =
  require("../../../utils/db_utils/makeDBEntry").makeRecipesDBEntry;

const router = express.Router();

router.use(express.json());

router
  .route("/:userName/recipes/create-recipe")
  .post(restrictToLoggedInUser, async (req, res) => {
    req.body.createdAt = req.body.updatedAt = Date.now();
    req.body.recipeTimeTaken.prepTime *= 60; // converting the time taken into seconds
    req.body.recipeTimeTaken.cookingTime *= 60;
    req.body.recipeCreator = req.params.userName;

    const isValidCookie = await validateCookie(
      req.cookies.access_token,
      req.params.userName
    );
    if (!isValidCookie) {
      res.status(403).json({
        success: false,
        statusCode: res.statusCode,
        message: `invalid request!`,
        data: null,
      });
    } else {
      try {
        await makeRecipesDBEntry(req.body);

        res.status(201).json({
          success: true,
          message: "recipe created successfully!",
          statusCode: res.statusCode,
          data: req.body,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          message: "Error creating recipe!",
          statusCode: res.statusCode,
        });
      }
    }
  });

module.exports = router;
