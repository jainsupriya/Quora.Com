const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

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

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: [true, "First Name is required"]
    },
    commentOwner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        }
    ],
    postedTime: {
        type: Date,
        default: Date.now()
    }
});

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
