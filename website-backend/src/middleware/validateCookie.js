const jwt = require("jsonwebtoken");
const { getOneEntryUsers } = require("../utils/db_utils/getDBEntry");

const validateCookie = async (cookie, userName) => {
  const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
  const result = await getOneEntryUsers({ _id: `${decoded.userId}` });
  return result.username === userName;
};

module.exports = validateCookie;
