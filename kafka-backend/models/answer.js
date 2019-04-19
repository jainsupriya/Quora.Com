const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");
const Comment = require("./comment");

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
    upVotes: {
        type: Number,
        required: [true, "upVotes is required"]
    },
    downVotes: {
        type: Number,
        required: [true, "downVotes is required"]
    },
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

const Answer = mongoose.model("nswer", AnswerSchema);

module.exports = Answer;
