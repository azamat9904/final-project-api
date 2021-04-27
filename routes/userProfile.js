const Router = require("express");
const userProfileController = require("../controllers/UserProfile");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../core/multer");
const router = Router();

router.post("/change-profile", authMiddleware, upload.single("image"), userProfileController.profileHandler);
router.get("/profile", authMiddleware, userProfileController.getProfileById);
module.exports = router;