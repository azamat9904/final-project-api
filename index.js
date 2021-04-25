const express = require("express");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userProfileRoutes = require("./routes/userProfile");
const postRoutes = require("./routes/postRoutes");
const createDBConnection = require("./core/db");
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.static('uploads'));

app.use("/users", userRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/category", categoryRoutes);
app.use("/post", postRoutes);

const start = async () => {
    try {
        await createDBConnection();
        app.listen(PORT, () => { console.log('Started on port ' + PORT) });
    } catch (e) {
        console.log(e);
    }
};

start();