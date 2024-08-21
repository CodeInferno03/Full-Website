const express = require("express");
const {
  getMultipleEntriesRecipes,
  getOneEntryUsers,
} = require("../../../utils/db_utils/getDBEntry");

const router = express.Router();

router.use(express.json());

router.route("/:userId/home/created-recipes/all").get(async (req, res) => {
  const userDetails = await getOneEntryUsers({ _id: `${req.params.userId}` });

  getMultipleEntriesRecipes({ recipeCreator: `${userDetails.username}` }).then(
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
