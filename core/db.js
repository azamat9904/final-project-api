const mongoose = require("mongoose");

const createDBConnection = async function () {
    return mongoose.connect(process.env.DB_URL, {
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
