const express = require("express");
const { getOneEntryRecipes } = require("../../../utils/db_utils/getDBEntry");

const router = express.Router();

router.use(express.json());

router
  .route("/:userId/home/recipes/:recipeId/:recipeName")
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
  });

module.exports = router;
