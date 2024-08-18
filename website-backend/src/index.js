require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn").connectDB;

// routes beginning with '/'
const loginRoute = require("./routes/slashRoutes/loginRoute");
const signupRoute = require("./routes/slashRoutes/signupRoute");

// routes beginning with '/user'
// created
const userAllCreatedRoute = require("./routes/userRoutes/created/allCreatedRoute");
const userIndividualCreatedRoute = require("./routes/userRoutes/created/individualCreatedRoute");
const userUpdateCreatedRoute = require("./routes/userRoutes/created/updateCreatedRoute");
// homepage
const userHomepageRoute = require("./routes/userRoutes/homepage/homepageRoute");
// profile
const userProfileRoute = require("./routes/userRoutes/profile/profileRoute");
// saved
const userAllSavedRoute = require("./routes/userRoutes/saved/allSavedRoute");
const userIndividualSavedRoute = require("./routes/userRoutes/saved/individualSavedRoute");
// recipes
const userAllRecipesRoute = require("./routes/userRoutes/recipes/allRecipes");
const userCreateRecipeRoute = require("./routes/userRoutes/recipes/createRecipe");
const userIndividualRecipeRoute = require("./routes/userRoutes/recipes/individualRecipe");

connectDB();

const app = express();
const PORT = process.env.PORT;

// endpoints
app.use("/", loginRoute);

app.use("/", signupRoute);

app.use("/user", userHomepageRoute);

app.use("/user", userProfileRoute);

app.use("/user", userAllCreatedRoute);

app.use("/user", userIndividualCreatedRoute);

app.use("/user", userUpdateCreatedRoute);

app.use("/user", userAllSavedRoute);

app.use("/user", userIndividualSavedRoute);

app.use("/user", userAllRecipesRoute);

app.use("/user", userCreateRecipeRoute);

app.use("/user", userIndividualRecipeRoute);

app.listen(PORT, function () {
  console.log(`App listening on Port ${PORT}`);
});
