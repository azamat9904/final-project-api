const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const videoController = require("../controllers/Video");

const router = Router();

router.post("/create", authMiddleware, videoController.create);
router.post("/delete", authMiddleware, videoController.delete);

module.exports = router;