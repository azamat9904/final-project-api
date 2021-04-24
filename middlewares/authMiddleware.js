const verifyToken = require("../utils/verifyToken");

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(403).json({
                message: "Пользователь не авторизован"
            });
        }

        const decodedData = verifyToken(token);
        req.user = decodedData;
        next();
    } catch (e) {
        return res.status(403).json({
            message: "Пользователь не авторизрван"
        })
    }
}