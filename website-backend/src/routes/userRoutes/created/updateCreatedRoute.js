const express = require("express");
const {
  updateOneEntryRecipes,
} = require("../../../utils/db_utils/updateDBEntry");
const { getOneEntryRecipes } = require("../../../utils/db_utils/getDBEntry");

const router = express.Router();

router.use(express.json());

router
  .route("/:userId/created-recipes/:recipeId/:recipeName/update")
  .get((req, res) => {
    getOneEntryRecipes({ _id: `${req.params.recipeId}` }).then((result) => {
      if (result.success !== false) {
        res.json({
          success: true,
          statusCode: res.statusCode,
          message: "recipe data retrieved successfully!",
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
  })
  .put((req, res) => {
    req.body.updatedDate = Date.now();

    updateOneEntryRecipes({ _id: `${req.params.recipeId}` }, req.body).then(
      (result) => {
        if (result.success !== false) {
          res.status(201).json({
            success: true,
            statusCode: res.statusCode,
            message: "recipe updated successfully!",
            data: req.body,
          });
        } else {
          res.status(400).json({
            success: false,
            statusCode: res.statusCode,
            message: result.message,
            data: null,
          });
        }
      }
    );
  });

module.exports = router;
