const express = require("express");
const { getOneEntryUsers } = require("../../utils/db_utils/getDBEntry");
const { comparePassword } = require("../../utils/passwordHasher");
const generateToken = require("../../utils/tokenGenerator");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(express.json());

router.route("/login").post(async (req, res) => {
  let checkBody = {};

  try {
    if (req.body.usernameOrEmail.split("@").length > 1) {
      checkBody.email = req.body.usernameOrEmail;
    } else {
      checkBody.username = req.body.usernameOrEmail;
    }

    const userData = await getOneEntryUsers(checkBody);
    if (
      userData === null ||
      !(await comparePassword(req.body.password, userData.password))
    ) {
      res.status(401).json({
        success: false,
        statusCode: res.statusCode,
        message: "incorrect username or password",
        data: null,
      });
    } else {
      const token = generateToken(userData._id, userData.username);

      res.cookie('access_token', `${token}`, {
        expires: new Date(Date.now() + (24 * 60 * 60 * 1000)) // 24 hours
      });

      res.status(200).json({
        success: true,
        statusCode: res.statusCode,
        message: "data found",
        data: userData,
      });

    }
  } catch (err) {
    res.status(400).json({
      success: false,
      statusCode: res.statusCode,
      message: err,
      data: null,
    });
  }
});

module.exports = router;
