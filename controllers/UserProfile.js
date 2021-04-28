const { count } = require("../models/UserProfile");
const generatePasswordHash = require("../utils/generatePasswordHash");
const UserProfile = require("../models/UserProfile");
const User = require("../models/User");

class UserProfileController {
    async profileHandler(req, res) {
        let id = req.user.payload;
        let { address, city, country, password, first_name, last_name } = req.body;

        let image = req.file;
        let userProfile = await UserProfile.findOne({ user: id });
        let url = process.env.HOST + '/';

        try {
            let data = {};

            if (password) {
                const hashPassword = generatePasswordHash(password);
                data = {
                    password: hashPassword
                }
            }

            if (first_name) {
                data = {
                    ...data,
                    first_name
                }
            }

            if (last_name) {
                data = {
                    ...data,
                    last_name
                }
            }

            const user = await User.findOne({ _id: id });
            await user.updateOne(data);
        } catch (error) {
            res.status(400).json({
                message: "Что то пошло не так"
            });
        }

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

        await userProfile.updateOne(updateData);

        res.json({
            message: "Профиль успешно обновлен"
        });
    }

    async getProfileById(req, res) {
        try {
            const userId = req.user.payload;
            const userProfile = await UserProfile.findOne({ user: userId });
            if (!userProfile) {
                res.status(200).json({
                    userProfile: null
                });
            }
            res.json({
                userProfile
            });
        } catch (error) {
            res.status(400).json({
                message: "Произошла какая та ошибка"
            });
        }

    }
};

module.exports = new UserProfileController();