const { check } = require("express-validator");

const registrationValidation = [
    check("email", "Логин не может быть пустым").notEmpty(),
    check("first_name", "Имя не может быть пустым").notEmpty(),
    check("last_name", "Фамилия не может быть пустым").notEmpty(),
    check("password", "Пароль должен быть более 5 символов").isLength({ min: 5 })
];
module.exports = registrationValidation;