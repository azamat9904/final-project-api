const mongoose = require("mongoose");

const createDBConnection = async function () {
    return mongoose.connect("mongodb://localhost:27017/project", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }, (err) => {
        if (err) {
            throw Error(err);
        }
    });
}

module.exports = createDBConnection;
