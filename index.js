const express = require("express");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userProfileRoutes = require("./routes/userProfile");
const postRoutes = require("./routes/postRoutes");
const videRoutes = require("./routes/videoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const createDBConnection = require("./core/db");
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));

app.use("/users", userRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/category", categoryRoutes);
app.use("/post", postRoutes);
app.use("/video", videRoutes);
app.use("/comment", commentRoutes);

const start = async () => {
    try {
        await createDBConnection();
        app.listen(PORT, () => { console.log('Started on port ' + PORT) });
    } catch (e) {
        console.log(e);
    }
};

start();