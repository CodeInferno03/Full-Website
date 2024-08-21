const express = require("express");
const getMultipleEntriesRecipes = require("../../../utils/db_utils/getDBEntry").getMultipleEntriesRecipes;

const router = express.Router();

router.use(express.json());

router.route("/:userId/home/recipes/all").get((req, res) => {

  getMultipleEntriesRecipes({}).then((result) => {
    if (Array.isArray(result)) {
      res.json({
        success: true,
        statusCode: res.statusCode,
        message: "All recipes retrived successfully!",
        data: result
      });
    } else {
      res.status(400).json({
        success: false,
        statusCode: res.statusCode,
        message: result.success
      });
    }
  })

});

module.exports = router;
