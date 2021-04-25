const Router = require("express");
const postController = require("../controllers/Post");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../core/multer");
const router = Router();

router.post("/increase-views", postController.increaseView);
router.post("/create", authMiddleware, upload.single("image"), postController.createPost);
router.post("/find", postController.find);

module.exports = router;