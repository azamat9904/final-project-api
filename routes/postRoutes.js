const Router = require("express");
const postController = require("../controllers/Post");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../core/multer");
const router = Router();

router.post("/increase-views", postController.increaseView);
router.post("/create", authMiddleware, upload.single("image"), postController.createPost);
router.post("/find", postController.find);
router.post("/findByAlias", postController.findByAlias);
router.post("/edit", authMiddleware, postController.edit);
router.post("/delete", authMiddleware, postController.delete);
router.get("/getPostById", postController.getPostById);
router.post("/search", postController.search);
router.get("/getAll", postController.getAll);
module.exports = router;