const Router = require("express");
const userController = require("../controllers/User");
const loginValidation = require("../utils/validations/login");
const registrionValidation = require("../utils/validations/registration");

const router = Router();
router.post("/signin", loginValidation, userController.login);
router.post("/signup", registrionValidation, userController.registration);
router.post("/token", userController.refreshToken);
module.exports = router;
