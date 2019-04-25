const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question is required"]
    },
    // questionOwner: {
    //     type: String,
    //     required: [true, "User is required"]
    // },
    questionOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    topicList: {
        type: String,
        required: [true, "Topic List String is required"]
    },
    // topicList: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: Topic
    //     }
    // ],
    followersUserList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    answerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "answer"
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now
    }
});

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
