const Router = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const commentController = require("../controllers/Comment");

const router = Router();

router.post("/getCommentsById", commentController.getComments);
router.post("/create", authMiddleware, commentController.createComment);

module.exports = router;