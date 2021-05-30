const Video = require("../models/Video");

class VideoController {
    async create(req, res) {
        try {
            const id = req.user.payload;
            const { title, description, shortDescription, videos } = req.body;
            const v = videos.split(',');

            let url = process.env.HOST + '/';
            let image = req.file;
            image = image ? url + image.filename : "";

            const video = new Video({
                title,
                description,
                shortDescription,
                image: image,
                user: id,
                videos: v
            });

            await video.save();

            res.json({
                message: "Видео успешно создан"
            });

        } catch (error) {

            return res.status(500).json({
                message: "Случилась какая то ошибка"
            });
        }

    }

    async delete(req, res) {
        try {
            const id = req.user.payload;
            const videoId = req.body.video_id;
            const video = await Video.findOne({ _id: videoId });

            if (video.user != id) {
                return res.status(403).json({
                    message: "У вас нет доступа к удалению"
                });
            }

            await video.remove();
            return res.json({
                message: "Видео успешно удален"
            });
        } catch (error) {
            return res.status(500).json({
                message: "Случилось какая то ошибка"
            });
        }
    }

    async getAll(req, res) {
        try {
            const limit = req.query.limit;
            let videos = null;

            if (limit) videos = await Video.find().limit(+limit);
            else videos = await Video.find();

            return res.json({
                videos
            });

        } catch (error) {

            return res.status(400).json({
                message: "Случилось какая та ошибка"
            });
        }
    }

    async getVideoById(req, res) {
        try {
            const videoId = req.params.id;
            const video = await Video.findOne({ _id: videoId });
            return res.json(video);
        } catch (error) {
            return res.status(500).json({
                message: "Случилось какая та ошибка"
            });
        }
    }

    async increaseView(req, res) {
        const videoId = req.body.videoId;
        const video = await Video.findOne({ _id: videoId });
        if (!video) {
            return res.status(404).json({
                message: "Такой пост не найден"
            });
        }
        const videoViewCount = video.viewCount;

        await video.update({
            viewCount: videoViewCount + 1
        });

        return res.json({
            message: "Количество просмотров успешно увеличен"
        });
    }

    async search(req, res) {
        try {
            const searchValue = req.body.searchValue;
            let videos = [];

            videos = await Video.find({
                $or: [
                    { title: { $regex: '.*' + searchValue + '.*', $options: 'i' } },
                    { description: { $regex: '.*' + searchValue + '.*', $options: 'i' } },
                    { shortDescription: { $regex: '.*' + searchValue + '.*', $options: 'i' } }
                ]
            },
            );

            res.json({
                videos
            });
        } catch (error) {

            return res.status(404).json({
                message: "Такой видео не найден"
            })
        }
    }
};

module.exports = new VideoController();