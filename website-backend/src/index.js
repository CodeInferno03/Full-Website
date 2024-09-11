require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConn").connectDB;

const loginRoute = require("./routes/login/loginRoute");
const signupRoute = require("./routes/signup/signupRoute");
const basicSlashRoute = require("./routes/slash/basicSlashRoute");
const homepageRoute = require("./routes/home/homepageRoute");
const recipesIndex = require("./routes/recipes/recipesIndex");
const profileIndex = require("./routes/profile/profileIndex");
const savedIndex = require("./routes/saved/savedIndex");
const createdIndex = require("./routes/created/createdIndex");

connectDB();

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;
const apiPath = process.env.API_PATH;

app.use(apiPath, basicSlashRoute); // /

app.use(apiPath, loginRoute); // /login

app.use(apiPath, signupRoute); // /signup

app.use(apiPath, createdIndex); // /recipes/created-recipes

app.use(apiPath, homepageRoute); // /home

app.use(apiPath, profileIndex); // /profile

app.use(apiPath, recipesIndex); // /recipes

app.use(apiPath, savedIndex); // /recipes/saved-recipes

app.listen(PORT, function () {
  console.log(`App listening on Port ${PORT}`);
});
