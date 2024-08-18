const express = require("express");

const router = express.Router();

router.use(express.json());

router
  .route("/:username/created/:recipeId/:recipeName/update")
  .put((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "PUT",
    });
  });

module.exports = router;
