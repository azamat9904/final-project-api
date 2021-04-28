const Post = require("../models/Post");
const Category = require("../models/Category");

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
            console.log(error);

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

    // async search(req, res) {
    //     try {
    //         const searchValue = req.body.searchValue;
    //         const posts = Post.find({ title: { $regex: '.*' + searchValue + '.*' } });

    //     } catch (error) {
    //         return res.status(404).json({
    //             message: "Такой пост не найден"
    //         })
    //     }


    // }

    async findByAlias(req, res) {
        try {
            const alias = req.body.alias;
            const category = await Category.findOne({ alias });
            const id = category._id;

            if (!id) {
                return res.json({
                    message: "Такая категория не существует"
                });
            }

            const posts = await Post.find({ category: id });

            return res.json({
                posts
            });
        } catch (error) {
            return res.status(400).json({
                message: "Случилось какая та ошибка"
            });
        }
    }

    async edit() {
        const id = req.user.paylaod;
    }

    async delete(req, res) {
        const id = req.user.payload;
        const postId = req.body.post_id;

        const post = await Post.findOne({ _id: postId });

        if (post.user != id) {
            return res.status(403).json({
                message: "У вас нет доступка к удалению поста"
            });
        }

        await post.remove();
        return res.json({
            message: "Пост успешно удален"
        });
    }
};

module.exports = new PostController();