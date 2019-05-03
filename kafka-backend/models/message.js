const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Sender _ID is required"]
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Receiver _ID is required"]
    },
    msgBody: {
        type: String,
        required: [true, "Message is required"]
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model("message", MessageSchema);
module.exports = Message;
