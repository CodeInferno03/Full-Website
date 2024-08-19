// function to hash passwords and unhash for secure storage
const bcrypt = require('bcrypt');

// function to hash a password
async function hashPassword(password) {
    const saltRounds = 10; // defines the cost factor for hashing, 10 is a common choice
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

// function to compare a plain text password with a hashed password
async function comparePassword(plainPassword, hashedPassword) {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
}

module.exports = { hashPassword, comparePassword }
