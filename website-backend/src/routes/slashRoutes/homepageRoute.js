const express = require("express");

const router = express.Router();

router.use(express.json());

router
  .route("/home")
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
