const express = require("express");
const {
  getMultipleEntriesRecipes,
  getOneEntryUsers,
} = require("../../../utils/db_utils/getDBEntry");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");

const router = express.Router();

router.use(express.json());

router.route("/:userName/created-recipes/all").get(restrictToLoggedInUser, async (req, res) => {
  getMultipleEntriesRecipes({ recipeCreator: `${req.params.userName}` }).then(
    (result) => {
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
    }
  );
});

module.exports = router;
