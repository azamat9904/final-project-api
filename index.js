const express = require("express");
const userRoutes = require("./routes/userRoutes");
const createDBConnection = require("./core/db");
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/users", userRoutes);

const start = async () => {
    try {
        await createDBConnection();
        app.listen(PORT, () => { console.log('Started on port ' + PORT) });
    } catch (e) {
        console.log(e);
    }
};

start();