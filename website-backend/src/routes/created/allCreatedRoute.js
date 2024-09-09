const express = require("express");
const {
  getMultipleEntriesRecipes,
} = require("../../utils/db_utils/getDBEntry");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const getDecodedCookieData = require("../../middleware/getDecodedCookieData");

const router = express.Router();

router.use(express.json());

router
  .route("/all")
  .get(restrictToLoggedInUser, async (req, res) => {
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    getMultipleEntriesRecipes({
      recipeCreator: `${decodedCookie.userName}`,
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
  });

module.exports = router;
