const { Schema, model } = require("mongoose");

const Videos = new Schema({
    title: {
        type: String,
        reuired: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    videos: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

module.exports = model("Video", Videos);

