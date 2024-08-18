const express = require("express");
const UsersModel = require("../config/dbModels").UsersModel;

const router = express.Router();

router.use(express.json());

router.route("/login").post((req, res) => {
  //res.statusCode = 200;
  res.json({
    success: true,
    statusCode: res.statusCode,
    requestType: 'POST'
  });
});

module.exports = router;
