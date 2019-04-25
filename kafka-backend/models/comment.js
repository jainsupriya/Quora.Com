const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: [true, "comment is required"]
    },
    answerId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "answer",
        required: [true, "Answer Id is required"]
        }
    ],
    // commentOwner: {
    //     type: String,
    //     required: [true, "Comment Owner is required"]
    // },
    commentOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
