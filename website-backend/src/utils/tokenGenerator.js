const jwt = require("jsonwebtoken");

const generateToken = (userIdVal, userName, expiryTime = 24) => {
  const token = jwt.sign(
    {
      userId: userIdVal,
      userName: userName,
    }, // payload,
    process.env.JWT_SECRET, // secret key
    { expiresIn: `${expiryTime}h` } // other useful stuff
  );

  return token;
};

module.exports = generateToken;
