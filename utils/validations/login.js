const { check } = require("express-validator");
const loginValidation = [
    check('email', "Не правильный формат email почты").isEmail(),
    check('password', "Пароль должен содержать более 5 символов").isLength({ min: 5 })
];

module.exports = loginValidation;