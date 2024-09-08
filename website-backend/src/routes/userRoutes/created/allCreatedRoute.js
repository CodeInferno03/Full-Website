const express = require("express");
const {
  getMultipleEntriesRecipes,
  getOneEntryUsers,
} = require("../../../utils/db_utils/getDBEntry");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const validateCookie = require("../../../middleware/validateCookie");

const router = express.Router();

router.use(express.json());

router
  .route("/:userName/created-recipes/all")
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
    } else {
      getMultipleEntriesRecipes({
        recipeCreator: `${req.params.userName}`,
      }).then((result) => {
        if (result.success !== false) {
          res.json({
            success: true,
            statusCode: res.statusCode,
            message: "created recipes successfully retrieved",
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
    }
  });

module.exports = router;
