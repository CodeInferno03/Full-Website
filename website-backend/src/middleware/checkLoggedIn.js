// middleware for cookie authentication
const jwt = require("jsonwebtoken");
const { getOneEntryUsers } = require("../utils/db_utils/getDBEntry");

const restrictToLoggedInUser = async (req, res, next) => {
  const accessToken = req.cookies?.access_token;
  if (!accessToken) {
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

    const user = await getOneEntryUsers({ _id: `${decoded.userId}` });

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

module.exports = restrictToLoggedInUser;
