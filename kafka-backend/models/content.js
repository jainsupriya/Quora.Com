const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./question");
const Answer = require("./answer");
const Comment = require("./comment");
const User = require("./user");

const ContentSchema = new Schema({
    userId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    contentType: {
        type: String,
        required: [true, "Content Type is required"]
    },
    contentId: [
        {
            type: Schema.Types.ObjectId,
            refPath: "contentIdModel"
        }
    ],
    contentIdModel: {
        type: String,
        required: true,
        enum: ['Answer', 'Question', 'Comment', 'User']
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const Content = mongoose.model("content", ContentSchema);
module.exports = Content;
