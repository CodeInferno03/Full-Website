const express = require("express");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");
const { getOneEntryUsers } = require("../../../utils/db_utils/getDBEntry");

const router = express.Router();

router.use(express.json());

router
  .route("/:userName/saved-recipes/all")
  .get(restrictToLoggedInUser, (req, res) => {
    getOneEntryUsers({ username: `${req.params.userName}` }).then((result) => {
      if (result.success !== false) {
        res.status(200).json({
          success: true,
          statusCode: res.statusCode,
          message: `Saved recipes successfully retrieved!`,
          data: result.savedRecipes,
        });
      } else {
        res.status(500).json({
          success: false,
          statusCode: res.statusCode,
          message: `Error getting data! Please try again later!`,
          data: null,
        });
      }
    });
  });

module.exports = router;
