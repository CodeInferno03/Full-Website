const express = require("express");
const makeUsersDBEntry = require('../../utils/db_utils/makeDBEntry').makeUsersDBEntry;
const hashPassword = require('../../utils/passwordHasher').hashPassword;

const router = express.Router();

router.use(express.json());

router.route("/signup").post(async (req, res) => {
  
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json({
      success: false,
      message: "\"Content-Type\" header must be set to \"application/json\"",
      statusCode: res.statusCode,
    });
  } else {
    // filling in some default values to the values not originally sent
    req.body.createdAt = req.body.updatedAt = Date.now();
    req.body.savedRecipes = [];

    try {
      const password = await hashPassword(req.body.password);
      req.body.password = password;
  
      await makeUsersDBEntry(req.body);
  
      res.json({
        success: true,
        message: "user data successfully uploaded!",
        statusCode: res.statusCode,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        success: false,
        message: "error uploading data!",
        statusCode: res.statusCode,
      })
    }
  }

});

module.exports = router;
