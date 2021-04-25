const { Schema, model } = require("mongoose");

const UserProfile = new Schema({
    address: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

module.exports = model("UserProfile", UserProfile);

