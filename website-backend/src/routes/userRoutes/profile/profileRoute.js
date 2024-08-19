const express = require("express");
const UsersModel = require('../../../config/dbModels').UsersModel;
const { hashPassword, comparePassword } = require('../../../utils/passwordHasher');
const getOneEntryUsers = require('../../../utils/getDBEntry').getOneEntryUsers;


const router = express.Router();

router.use(express.json());

router
  .route("/:userId/profile")
  .get((req, res) => {
    
    const userIdVal = req.params.userId;

    // we get the data of the current user to display
    getOneEntryUsers({ _id: `${userIdVal}` }).then(
      result => {
        // if the data was successfully retrieved then send it
        if (result.success !== false) {
          res.json({
            success: true,
            message: "data successfully retrieved!",
            statusCode: res.statusCode,
            data: result,
          })
        } else {
          res.status(400).json({
            success: false,
            message: result.message,
            statusCode: res.statusCode,
          })
        }
      }
    )

  })
  .put((req, res) => {
    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "PUT",
    });
  });

module.exports = router;
