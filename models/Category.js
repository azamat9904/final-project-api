const { Schema, model } = require("mongoose");

const Category = new Schema({
    name: {
        type: String,
        reuired: true
    },
    alias: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Category", Category);

