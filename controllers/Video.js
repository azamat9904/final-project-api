const Video = require("../models/Video");

class VideoController {
    async create(req, res) {
        try {
            const id = req.user.payload;
            const { title, description, videos } = req.body;

            const video = new Video({
                title,
                description,
                user: id,
                videos
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
};

module.exports = new VideoController();