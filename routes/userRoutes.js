const Router = require("express");
const userController = require("../controllers/User");
const loginValidation = require("../utils/validations/login");
const registrionValidation = require("../utils/validations/registration");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();
router.post("/signin", loginValidation, userController.login);
router.post("/signup", registrionValidation, userController.registration);
router.post("/token", userController.refreshToken);
router.post("/verify-email", userController.verifyEmail);
router.get("/me", authMiddleware, userController.me);
router.post("/forget-password", userController.forgetPassword);
router.post("/reset-password", userController.resetPassword);
router.post("/getUserById", authMiddleware, userController.getUserById);
module.exports = router;
