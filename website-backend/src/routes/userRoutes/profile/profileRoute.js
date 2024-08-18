const express = require("express");

const router = express.Router();

router.use(express.json());

router
  .route("/:username/profile")
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
