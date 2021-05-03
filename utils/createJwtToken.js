const jwt = require('jsonwebtoken');

const createJwtToken = (payload) => {
    return jwt.sign({ payload }, process.env.SECRET || "", { expiresIn: '24h', algorithm: "HS256", });
};

module.exports = createJwtToken;