const jwt = require("jsonwebtoken");

const generateToken = (userIdVal, expiryTime = 24) => {
  const token = jwt.sign(
    { userId: userIdVal }, // payload,
    process.env.JWT_SECRET, // secret key
    { expiresIn: `${expiryTime}h` } // other useful stuff
  );

  return token;
};

module.exports = generateToken;
