const express = require("express");
const {
  getOneEntryRecipes,
} = require("../../utils/db_utils/getDBEntry");
const {
  deleteOneEntryRecipes,
} = require("../../utils/db_utils/deleteDBEntry");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const handleDeleteRecipe = require("../../middleware/handleDeleteRecipes");

const router = express.Router();

router.use(express.json());

router
  .route("/:recipeId([0-9a-fA-F]{24})/:recipeName")
  .get(restrictToLoggedInUser, async (req, res) => {
    getOneEntryRecipes({ _id: `${req.params.recipeId}` }).then((result) => {
      if (result.success !== false) {
        res.json({
          success: true,
          statusCode: res.statusCode,
          message: "recipe successfully retrieved!",
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
  .delete(
    restrictToLoggedInUser,
    async (req, res) => {
      deleteOneEntryRecipes({ _id: `${req.params.recipeId}` }).then(
        (result) => {
          if (result.success !== false) {
            handleDeleteRecipe(req.params.recipeId);

            res.status(204).json({
              success: true,
              statusCode: res.statusCode,
              message: "recipe successfully deleted",
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
        }
      );
    }

    // have to make logic to delete this from any users' saved recipes as well
  );

module.exports = router;
