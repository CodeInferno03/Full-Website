const express = require("express");

const router = express.Router();

router.use(express.json());

router
  .route("/:userId/created/:recipeId/:recipeName/update")
  .get((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "GET",
    });
  })
  .put((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "PUT",
    });
  });

module.exports = router;
