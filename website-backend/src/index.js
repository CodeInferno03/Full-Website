require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser')
const connectDB = require("./config/dbConn").connectDB;

// routes beginning with '/api'
const loginRoute = require("./routes/slashRoutes/loginRoute");
const signupRoute = require("./routes/slashRoutes/signupRoute");
const basicSlashRoute = require('./routes/slashRoutes/basicSlashRoute');
const homepageRoute = require("./routes/slashRoutes/homepageRoute");
// recipes
const allRecipesRoute = require("./routes/slashRoutes/recipes/allRecipes");
const individualRecipeRoute = require("./routes/slashRoutes/recipes/individualRecipe");

// routes beginning with '/api/user'
// created
const userAllCreatedRoute = require("./routes/userRoutes/created/allCreatedRoute");
const userIndividualCreatedRoute = require("./routes/userRoutes/created/individualCreatedRoute");
const userUpdateCreatedRoute = require("./routes/userRoutes/created/updateCreatedRoute");
const userCreateRecipeRoute = require("./routes/userRoutes/created/createRecipe");

// profile
const userProfileRoute = require("./routes/userRoutes/profile/profileRoute");
const userProfileChangePasswordRoute = require('./routes/userRoutes/profile/profileChangePasswordRoute');
// saved
const userAllSavedRoute = require("./routes/userRoutes/saved/allSavedRoute");
const userIndividualSavedRoute = require("./routes/userRoutes/saved/individualSavedRoute");


connectDB();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;
const basicPath = process.env.BASIC_PATH
const userPath = process.env.USER_PATH

// endpoints
app.use(basicPath, basicSlashRoute); // /

app.use(basicPath, loginRoute); // /login

app.use(basicPath, signupRoute); // /signup

app.use(basicPath, homepageRoute); // /home

app.use(basicPath, individualRecipeRoute); // /recipes/:recipeId/recipeName

app.use(basicPath, allRecipesRoute); // /recipes/all

app.use(userPath, userProfileRoute); // /:userId/profile

app.use(userPath, userProfileChangePasswordRoute); // /:userId/profile/change-password

app.use(userPath, userAllCreatedRoute); // /:userId/created-recipes/all

app.use(userPath, userIndividualCreatedRoute); // /:userId/created-recipes/:recipeId/:recipeName

app.use(userPath, userUpdateCreatedRoute); // /:userId/created-recipes/:recipeId/:recipeName/update

app.use(userPath, userAllSavedRoute); // /:userId/saved-recipes/all

app.use(userPath, userIndividualSavedRoute); // /:userId/saved-recipes/:recipeId/:recipeName

app.use(userPath, userCreateRecipeRoute); // /:userId/recipes/create-recipe



app.listen(PORT, function () {
  console.log(`App listening on Port ${PORT}`);
});
