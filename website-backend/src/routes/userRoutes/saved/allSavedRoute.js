const express = require("express");
const restrictToLoggedInUser = require("../../../middleware/checkLoggedIn");

const router = express.Router();

router.use(express.json());

router.route("/:userName/saved-recipes/all").get(restrictToLoggedInUser, (req, res) => {
  res.json({
    success: true,
    statusCode: res.statusCode,
    requestType: "GET",
  });
});

module.exports = router;
