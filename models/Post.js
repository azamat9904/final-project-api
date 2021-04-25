const { Schema, model } = require("mongoose");

const Post = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    view_count: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = model("Post", Post);

