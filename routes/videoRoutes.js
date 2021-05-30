const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const videoController = require("../controllers/Video");
const upload = require("../core/multer");
const router = Router();

router.post("/create", authMiddleware, upload.single('image'), videoController.create);
router.post("/delete", authMiddleware, videoController.delete);
router.get("/getAll", videoController.getAll);
router.get("/getVideoById/:id", videoController.getVideoById);
router.post("/increaseView", videoController.increaseView);
router.post("/search", videoController.search);

module.exports = router;