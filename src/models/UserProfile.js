const { Schema, model } = require("mongoose");

const UserProfile = new Schema({
    address: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = model("UserProfile", UserProfile);

