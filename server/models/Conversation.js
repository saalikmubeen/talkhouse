const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        
        participants: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],

        messages: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        }
    ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationSchema);
