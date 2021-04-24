// const http = require('http');
// const express = require('express');
// const dotenv = require('dotenv');
// const bodyParser = require("body-parser");
// const userRoutes = require("./routes/userRoutes.mjs");
// require("./core/db.js");


// dotenv.config();

// const app = express();
// const httpInstance = http.createServer(app);
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.use('/users', userRoutes);

// httpInstance.listen(port, () => {
// console.log('Started on port ' + port);
// });

const express = require("express");
const userRoutes = require("./routes/userRoutes");
const createDBConnection = require("./core/db");
const RefreshToken = require("./utils/RefreshToken");
const UserModel = require("./models/User");
const createJwtToken = require("./utils/createJwtToken");
const randtoken = require('rand-token');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

app.post("/token", async (req, res) => {
    try {
        const email = req.body.email;
        const refreshToken = req.body.refreshToken;
        const refreshTokenInstance = new RefreshToken();
        const refreshTokens = refreshTokenInstance.get();

        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == email)) {
            const user = await UserModel.findOne({
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
});

const start = async () => {
    try {
        await createDBConnection();
        app.listen(PORT, () => { console.log('Started on port ' + PORT) });
    } catch (e) {
        console.log(e);
    }
};

start();