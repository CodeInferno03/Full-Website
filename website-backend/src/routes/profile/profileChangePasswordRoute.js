const express = require("express");
const {
  hashPassword,
  comparePassword,
} = require("../../utils/passwordHasher");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const getDecodedCookieData = require("../../middleware/getDecodedCookieData");
const getOneEntryUsers =
  require("../../utils/db_utils/getDBEntry").getOneEntryUsers;
const updateOneEntryUsers =
  require("../../utils/db_utils/updateDBEntry").updateOneEntryUsers;

const router = express.Router();

router.use(express.json());

router
  .route("/change-password")
  .put(restrictToLoggedInUser, async (req, res) => {
    // req: { oldPassword: String, newPassword: String }
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    getOneEntryUsers({ username: `${decodedCookie.userName}` }).then(
      async (result) => {
        if (!(await comparePassword(req.body.oldPassword, result.password))) {
          // if the password entered is incorrect
          res.status(403).json({
            success: false,
            statusCode: res.statusCode,
            message: "Incorrect password!",
          });
        } else if (
          await comparePassword(req.body.newPassword, result.password)
        ) {
          // if the new password is the same as the old password
          res.status(409).json({
            success: false,
            statusCode: res.statusCode,
            message: "new password cannot be the same as old password!",
          });
        } else {
          // if the password is correct, allow the user to change it
          const newHashedPassword = await hashPassword(req.body.newPassword);
          updateOneEntryUsers(
            { username: `${decodedCookie.username}` },
            { updatedAt: Date.now(), password: newHashedPassword }
          );
          res.json({
            success: true,
            statusCode: res.statusCode,
            message: "password changed successfully!",
            data: req.body,
          });
        }
      }
    );
  });

module.exports = router;
