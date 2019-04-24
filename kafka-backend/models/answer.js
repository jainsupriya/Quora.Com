const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Comment = require("./comment");
const Question = require("./question");

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
            ref: Question,
            required: [true, "First Name is required"]

        }
    ],
    answerOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
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
            ref: User
        }
    ],
    upVotesCount: {
        type: Number,
        default: 0
    },
    // downVotes: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: User
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
            ref: Comment
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now()
    }
});

const Answer = mongoose.model("answer", AnswerSchema);

module.exports = Answer;
