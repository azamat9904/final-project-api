const Comment = require("../models/Comment");

class CommentController {
    async getComments(req, res) {
        try {
            const dataID = req.body.id;
            const comments = await Comment.find({ materialId: dataID }).sort({ createdAt: 1 });
            return res.json({
                comments
            });
        } catch (error) {
            res.status(500).json({
                message: "Случилась какая та ошибка"
            });
        }
    }

    async createComment(req, res) {
        try {
            const userId = req.user.payload;
            const userComment = req.body.comment;
            const materialId = req.body.materialId;
            const comment = new Comment({
                user: userId,
                comment: userComment,
                materialId
            });
            await comment.save();
            res.json({
                comment
            });
        } catch (error) {
            res.status(500).json({
                message: "Случилась какая та ошибка"
            });
        }
    }
};

module.exports = new CommentController();