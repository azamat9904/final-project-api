const Post = require("../models/Post");

class PostController {

    async increaseView(req, res) {
        const postId = req.body.postId;
        const post = await Post.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({
                message: "Такой пост не найден"
            });
        }
        const postViewCount = post.view_count;

        await post.update({
            view_count: postViewCount + 1
        });

        return res.json({
            message: "Количество просмотров успешно увеличен"
        });
    }

    async createPost(req, res) {
        try {
            let url = process.env.HOST + '/';
            let image = req.file;
            image = image ? url + image.filename : "";
            const userId = req.user.payload;
            const { title, description, category, content } = req.body;

            const post = new Post({
                title,
                description,
                content,
                user: userId,
                image,
                category
            });

            await post.save();

            return res.json({
                message: "Пост успешно создан"
            });
        } catch (error) {

            return res.status(500).json({
                message: "Случилось какая та ошибка"
            });
        }
    }

    async find(req, res) {
        try {
            const param = req.body.param;

            if (param == "popular") {
                const post = await Post.find().sort({ view_count: -1 }).limit(10);
                return res.json({
                    post
                });
            }

            if (param == "last") {
                const post = await Post.find().sort({ createdAt: -1 }).limit(10);
                return res.json({
                    post
                });
            }

            return res.json({
                message: "Не правильный параметр"
            });

        } catch (error) {
            res.status(500).json({
                message: "Случилось какая та ошибка"
            })
        }
    }
};

module.exports = new PostController();