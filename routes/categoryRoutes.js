const Router = require("express");
const catgoryController = require("../controllers/Category");

const router = Router();

router.get("/", catgoryController.getCategories);

module.exports = router;