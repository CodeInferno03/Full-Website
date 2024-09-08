const express = require("express");
const {
  getOneEntryRecipes,
  getMultipleEntriesUsers,
} = require("../../../utils/db_utils/getDBEntry");
const {
  deleteOneEntryRecipes,
} = require("../../../utils/db_utils/deleteDBEntry");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const validateCookie = require("../../../middleware/validateCookie");

const router = express.Router();

router.use(express.json());

router
  .route("/:userName/created-recipes/:recipeId/:recipeName")
  .get(restrictToLoggedInUser, async (req, res) => {
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
    }

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
  .delete(restrictToLoggedInUser, async (req, res) => {
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
      deleteOneEntryRecipes({ _id: `${req.params.recipeId}` }).then(
        (result) => {
          if (result.success !== false) {
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
  });

module.exports = router;
