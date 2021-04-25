const Category = require("../models/Category");

class CategoryController {
    async getCategories(req, res) {
        const categories = await Category.find({});
        res.json({
            categories
        });
    }
};

module.exports = new CategoryController();