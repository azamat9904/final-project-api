const User = require("../models/User");
const { validationResult } = require("express-validator");
const createJwtToken = require("../utils/createJwtToken");
const generatePasswordHash = require("../utils/generatePasswordHash");
const randtoken = require('rand-token')
const bcrypt = require("bcrypt");
const RefreshToken = require("../utils/RefreshToken");
const mailer = require("../core/nodemailer");

const refreshTokenInstance = new RefreshToken();

class UserController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({
                    message: "Такой пользователь не существует"
                });
            }

            const validPassword = bcrypt.compareSync(password, user.password);


            if (!validPassword) {
                return res.status(400).json({
                    message: "Данные не верны"
                });
            }


            const token = createJwtToken(user._id);
            const refreshToken = randtoken.uid(256);
            refreshTokenInstance.setRefreshToken(refreshToken, email);

            console.log(refreshTokenInstance);

            return res.json({
                token,
                refreshToken
            });
        } catch (error) {
            return res.status(400).json({
                message: "Ошибка авторизации"
            })
        }

    }

    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                const errorInfo = {};

                errors.errors?.forEach((error) => {
                    errorInfo[error.param] = error.msg;
                })
                return res.status(400).json({ message: errorInfo });
            }
            const { email, password, first_name, last_name } = req.body;
            const isUserExist = await User.findOne({ email });

            if (isUserExist) {
                return res.status(400).json({ message: "Пользователь с таким логином уже существует" });
            }

            const hashPassword = generatePasswordHash(password);
            const user = new User({
                email,
                password: hashPassword,
                first_name,
                last_name
            });
            await user.save();


            const mailOptions = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Ссылка для подтверждения почты",
                html: 'test'
            };

            mailer.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            return res.json({ message: "Пользователь успешно создан" });
        } catch (e) {
            res.status(500).json({
                message: "Произошла какая та ошибка" + e
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const email = req.body.email;
            const refreshToken = req.body.refreshToken;
            const refreshTokens = refreshTokenInstance.get();

            if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == email)) {
                const user = await User.findOne({
                    email
                });

                if (!user) {
                    return res.status(401).json({
                        message: "Не правильный refresh токен"
                    });
                }

                const newToken = createJwtToken(user._id);
                const newRefreshToken = randtoken.uid(256);
                delete refreshTokenInstance[refreshToken];
                refreshTokenInstance.setRefreshToken(newRefreshToken, email);

                return res.json({ token: newToken, refreshToken: newRefreshToken });
            }
            else {
                return res.status(401).json({
                    message: "Пользователь не авторизован"
                });
            }
        } catch (error) {

            return res.status(401).json({
                message: "Пользователь не авторизован"
            });
        }
    }
};

module.exports = new UserController();