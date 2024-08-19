const express = require("express");

const router = express.Router();

router.use(express.json());

router.route("/:userId/recipes/all").get((req, res) => {
  res.json({
    success: true,
    statusCode: res.statusCode,
    requestType: "GET",
  });
});

module.exports = router;
