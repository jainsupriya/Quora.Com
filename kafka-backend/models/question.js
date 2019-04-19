const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Topic = require("./topic");
const Answer = require("./answer");

// sample: {
//     type: String | Number | Date | Boolean,
//     required: [true,"User Name is required"],
//     trim: true,
//     lowercase: true,
//     unique: true,
//     validate: [validateEmail, 'Please fill a valid email address'],
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
//     default: false,
// },

const QuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, "First Name is required"]
    },
    questionOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    topicList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Topic
        }
    ],
    followersUserList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    answerList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Answer
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now()
    }
});

const Question = mongoose.model("question", QuestionSchema);

module.exports = Question;
