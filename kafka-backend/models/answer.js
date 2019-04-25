const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    answer: {
        type: String,
        required: [true, "First Name is required"]
    },
    // answerOwner: {
    //     type: String
    // },
    questionId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question",
            required: [true, "First Name is required"]

        }
    ],
    answerOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    imageList: [
        {
            type: String
        }
    ],
    isAnonymous: {
        type: Boolean,
        required: [true, "isAnonymous is required"]
    },
    votes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    upVotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    upVotesCount: {
        type: Number,
        default: 0
    },
    // downVotes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "user"
    //     }
    // ],
    // upVotes: {
    //     type: Number,
    //     default: 0
    // },
    // downVotes: {
    //     type: Number,
    //     default: 0
    // },
    commentList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now()
    }
});

const Answer = mongoose.model("answer", AnswerSchema);

module.exports = Answer;
