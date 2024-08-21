const express = require("express");
const getOneEntryUsers = require("../../../utils/db_utils/getDBEntry").getOneEntryUsers;
const makeRecipesDBEntry =
  require("../../../utils/db_utils/makeDBEntry").makeRecipesDBEntry;

const router = express.Router();

router.use(express.json());

router.route("/:userId/home/recipes/create").post(async (req, res) => {
  const recipeCreator = await getOneEntryUsers({ _id: `${req.params.userId}` })

  req.body.createdAt = req.body.updatedAt = Date.now();
  req.body.recipeTimeTaken.prepTime *= 60;  // converting the time taken into seconds
  req.body.recipeTimeTaken.cookingTime *= 60;
  req.body.recipeCreator = recipeCreator.username;

  try {
    await makeRecipesDBEntry(req.body);

    res.status(201).json({
      success: true,
      message: "recipe created successfully!",
      statusCode: res.statusCode,
      data: req.body,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error creating recipe!",
      statusCode: res.statusCode,
    });
  }
});

module.exports = router;
