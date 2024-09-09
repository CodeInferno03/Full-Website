const jwt = require('jsonwebtoken');

const getDecodedCookieData = (cookie) => {
    try {
        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
        return {...decoded}
    } catch (err) {
        console.log(`err: ${err}`)
        return null;
    }

    
}

module.exports = getDecodedCookieData;