const express = require("express");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const getDecodedCookieData = require("../../middleware/getDecodedCookieData");
const getOneEntryUsers =
  require("../../utils/db_utils/getDBEntry").getOneEntryUsers;
const updateOneEntryUsers =
  require("../../utils/db_utils/updateDBEntry").updateOneEntryUsers;

const router = express.Router();

router.use(express.json());

router
  .route("/")
  .get(restrictToLoggedInUser, async (req, res) => {
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    getOneEntryUsers({ username: `${decodedCookie.userName}` }).then(
      (result) => {
        // if the data was successfully retrieved then send it
        if (result.success !== false) {
          res.json({
            success: true,
            message: "data successfully retrieved!",
            statusCode: res.statusCode,
            data: result,
          });
        } else {
          res.status(400).json({
            success: false,
            message: result.message,
            statusCode: res.statusCode,
          });
        }
      }
    );
  })
  .put(restrictToLoggedInUser, async (req, res) => {
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    // req will have all the arguments except saved-recipes, createdAt, and updatedAt, and password
    req.body.updatedDate = Date.now();

    updateOneEntryUsers(
      { username: `${decodedCookie.userName}` },
      req.body
    ).then((result) => {
      if (result.success !== false) {
        res.status(201).json({
          success: true,
          message: "data successfully changed",
          statusCode: res.statusCode,
          data: req.body,
        });
      } else {
        res.status(400).json({
          success: false,
          message: result.message,
          statusCode: res.statusCode,
        });
      }
    });
  });

module.exports = router;
