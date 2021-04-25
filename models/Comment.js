const { Schema, model } = require("mongoose");

const Comment = new Schema({
    comment: {
        type: String,
        reuired: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }
}, {
    timestamps: true
});

module.exports = model("Comment", Comment);

