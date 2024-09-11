const express = require("express");
const {
  getMultipleEntriesRecipes,
  getOneEntryUsers,
} = require("../../utils/db_utils/getDBEntry");
const jwt = require("jsonwebtoken");
const restrictToLoggedInUser = require("../../middleware/checkLoggedIn");
const {
  deleteOneEntryUsers,
  deleteMultipleEntriesRecipes,
} = require("../../utils/db_utils/deleteDBEntry");
const getDecodedCookieData = require("../../middleware/getDecodedCookieData");

const router = express.Router();

router.use(express.json());

router
  .route("/home")
  .get((req, res) => {
    let featuredRecipes = [];
    // __v is present in every mongodb entry
    getMultipleEntriesRecipes({ __v: 0 }).then((result) => {
      console.log(`result: ${result}`);
      featuredRecipes = result
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, 3);
    });
    console.log(`featured recipes = ${featuredRecipes}`);

    if (!req.cookies.access_token) {
      res.status(200).json({
        success: true,
        statusCode: res.statusCode,
        message: `Featured Recipes retrieved`,
        data: {
          savedRecipes: null,
          featuredRecipes: featuredRecipes,
        },
      });
    } else {
      const accessToken = req.cookies.access_token;
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
      getOneEntryUsers({ _id: `${decoded.userId}` }).then((result) => {
        if (result.success === false) {
          res.status(400).json({
            success: false,
            statusCode: res.statusCode,
            message: result.message,
            data: null,
          });
        } else {
          const featuredSavedRecipes = result.savedRecipes
            .sort((a, b) => b.savedAt - a.savedAt)
            .slice(0, 3);
          res.status(200).json({
            success: true,
            statusCode: res.statusCode,
            message: `All data successfully retrieved`,
            data: {
              savedRecipes: featuredSavedRecipes,
              featuredRecipes: featuredRecipes,
            },
          });
        }
      });
    }
  })
  .post(restrictToLoggedInUser, (req, res) => {
    // logout
    res.clearCookie("access_token", {
      sameSite: "strict",
    });

    res.status(205).json({
      success: true,
      statusCode: res.statusCode,
      requestType: `successfully logged out! redirect to home page!`,
      data: [],
    });
  })
  .delete(restrictToLoggedInUser, (req, res) => {
    // delete account
    const decodedCookie = getDecodedCookieData(req.cookies.access_token);

    // should probably also delete the recipes actually.
    deleteMultipleEntriesRecipes({
      recipeCreator: `${decodedCookie.userName}`,
    }).then((result) => {
      if (result.success === false) {
        res.status(400).json({
          success: false,
          statusCode: res.statusCode,
          message: `Error removing recipes`,
          data: null,
        });
      }
    });

    deleteOneEntryUsers({ _id: `${decodedCookie.userId}` }).then((result) => {
      if (result.success === false) {
        res.status(400).json({
          success: false,
          statusCode: res.statusCode,
          message: `Error perfoming action, please try again later!`,
          data: null,
        });
      } else {
        res.clearCookie("access_token", {
          sameSite: "strict",
        });

        res.status(204).json({
          success: true,
          statusCode: res.statusCode,
          message: `User data successfully deleted!`,
          data: result,
        });
      }
    });

    res.json({
      success: true,
      statusCode: res.statusCode,
      requestType: "DELETE",
    });
  });

module.exports = router;
