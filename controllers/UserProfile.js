const { count } = require("../models/UserProfile");
const UserProfile = require("../models/UserProfile");

class UserProfileController {
    async profileHandler(req, res) {
        let id = req.user.payload;
        let { address, city, country } = req.body;
        let image = req.file;
        let userProfile = await UserProfile.findOne({ user: id });
        let url = process.env.HOST + '/';

        if (!userProfile) {
            image = image ? url + image.filename : "";

            const userProfile = new UserProfile({
                city,
                country,
                image,
                address,
                user: id
            });
            await userProfile.save();
            return res.json({
                message: "Профиль успешно создан"
            });
        }

        const updateData = {};

        if (city) {
            updateData['city'] = city;
        }

        if (address) {
            updateData['address'] = address;
        }

        if (country) {
            updateData['country'] = country;
        }

        if (image) {
            updateData['image'] = url + image.filename;
        }

        await userProfile.update(updateData);

        res.json({
            message: "Профиль успешно обновлен"
        });
    }
};

module.exports = new UserProfileController();