const bcrypt = require('bcrypt');

module.exports = (secretKey) => {
    return bcrypt.hashSync(secretKey, 7);
}