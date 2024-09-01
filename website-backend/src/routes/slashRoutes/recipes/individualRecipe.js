const express = require("express");
const { getOneEntryRecipes } = require("../../../utils/db_utils/getDBEntry");
const { updateOneEntryUsers } = require("../../../utils/db_utils/updateDBEntry");

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
  }).put((req, res) => {
    updateOneEntryUsers({ _id: `${req.params.userId}` }, req.body).then((result) => {
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
