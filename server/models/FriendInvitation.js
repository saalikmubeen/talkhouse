const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        content: {
            type: String,
            required: [true, "can't be blank"],
        },

        type: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
