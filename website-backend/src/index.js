require("dotenv").config();
const express = require("express");
const connectDB = require("./config/dbConn").connectDB;

// routes beginning with '/api'
const loginRoute = require("./routes/slashRoutes/loginRoute");
const signupRoute = require("./routes/slashRoutes/signupRoute");
const basicSlashRoute = require('./routes/slashRoutes/basicSlashRoute')

// routes beginning with '/api/user'
// created
const userAllCreatedRoute = require("./routes/userRoutes/created/allCreatedRoute");
const userIndividualCreatedRoute = require("./routes/userRoutes/created/individualCreatedRoute");
const userUpdateCreatedRoute = require("./routes/userRoutes/created/updateCreatedRoute");
// homepage
const userHomepageRoute = require("./routes/userRoutes/homepage/homepageRoute");
// profile
const userProfileRoute = require("./routes/userRoutes/profile/profileRoute");
const userProfileChangePasswordRoute = require('./routes/userRoutes/profile/profileChangePasswordRoute');
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

// app.use(express.json());

// endpoints
app.use("/api", basicSlashRoute);

app.use("/api", loginRoute);

app.use("/api", signupRoute);

app.use("/api/user", userHomepageRoute);

app.use("/api/user", userProfileRoute);

app.use("/api/user", userProfileChangePasswordRoute);

app.use("/api/user", userAllCreatedRoute);

app.use("/api/user", userIndividualCreatedRoute);

app.use("/api/user", userUpdateCreatedRoute);

app.use("/api/user", userAllSavedRoute);

app.use("/api/user", userIndividualSavedRoute);

app.use("/api/user", userAllRecipesRoute);

app.use("/api/user", userCreateRecipeRoute);

app.use("/api/user", userIndividualRecipeRoute);

app.listen(PORT, function () {
  console.log(`App listening on Port ${PORT}`);
});
