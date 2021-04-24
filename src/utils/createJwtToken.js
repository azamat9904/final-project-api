const jwt = require('jsonwebtoken');

const createJwtToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET || "", { expiresIn: "24h", algorithm: "HS256", });
};

module.exports = createJwtToken;