const Post = require("../models/Post");
const Category = require("../models/Category");
const UserProfile = require("../models/UserProfile");
const axios = require('axios');

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
            const cleanText = content.replace(/<\/?[^>]+(>|$)/g, "");

            const post = new Post({
                title,
                description,
                content,
                user: userId,
                image,
                category
            });

            const { data } = await axios.post("http://127.0.0.1:8000/pred/predict", {
                title: cleanText.slice(0, content.length > 100 ? 100 : content.length)
            });


            if (data.result == 1) {
                await post.save();

                return res.json({
                    message: "Пост успешно создан",
                    result: data.result,
                    probability: data.probability
                });
            } else {
                return res.status(500).json({
                    message: "Ваша статья не соответствует к теме",
                    result: data.result,
                    probability: data.probability
                });
            }
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
                const posts = await Post.find().sort({ view_count: -1 }).limit(10);
                return res.json({
                    posts
                });
            }

            if (param == "last") {
                const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
                return res.json({
                    posts
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

    async search(req, res) {
        try {
            const searchValue = req.body.searchValue;
            const alias = req.body.alias;
            let posts = [];

            if (!alias) {
                posts = await Post.find({
                    $or: [
                        { title: { $regex: '.*' + searchValue + '.*', $options: 'i' } },
                        { description: { $regex: '.*' + searchValue + '.*', $options: 'i' } }
                    ]
                },
                );
            } else {
                const category = await Category.findOne({ alias });
                posts = await Post.find({
                    $and: [
                        {
                            $or: [
                                { title: { $regex: '.*' + searchValue + '.*', $options: 'i' } },
                                { description: { $regex: '.*' + searchValue + '.*', $options: 'i' } }
                            ]
                        },
                        {
                            category: category._id
                        }
                    ]
                });
            }

            res.json({
                posts
            });
        } catch (error) {
            console.log(error);

            return res.status(404).json({
                message: "Такой пост не найден"
            })
        }
    }

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

    async getPostById(req, res) {
        try {
            const postId = req.query.post_id;
            const post = await Post.findOne({ _id: postId }).populate(['user', 'category']);

            const userId = post.user._id;
            const userProfile = await UserProfile.findOne({ user: userId });

            post.user.image = userProfile.image;

            return res.json({
                post,
                userImage: userProfile.image
            });

        } catch (error) {
            console.log(error);

            return res.status(400).json({
                message: "Случилось какая та ошибка"
            });
        }

    }

    async getAll(req, res) {
        try {
            const posts = await Post.find();

            return res.json({
                posts
            });

        } catch (error) {
            return res.status(400).json({
                message: "Случилось какая та ошибка"
            });
        }
    }
};

module.exports = new PostController();