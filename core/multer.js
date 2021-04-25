const multer = require("multer");
const sha256 = require('crypto-js/sha256');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let fileFormat = file.mimetype.split('/');
        const filename = sha256(file.fieldname + '-' + Date.now()) + '.' + fileFormat[fileFormat.length - 1];
        cb(null, filename);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;