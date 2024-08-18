const express = require("express");

const router = express.Router();

router.use(express.json());

router
  .route("/:username/created/:recipeId/:recipeName")
  .get((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "GET",
    });
  })
  .delete((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "DELETE",
    });
  });

module.exports = router;
