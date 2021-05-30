const { Schema, model } = require("mongoose");

const Videos = new Schema({
    title: {
        type: String,
        requried: true
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videos: {
        type: Array,
        default: []
    },
    viewCount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = model("Video", Videos);

