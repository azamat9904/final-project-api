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
    materialId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model("Comment", Comment);

