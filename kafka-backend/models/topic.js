const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const TopicSchema = new Schema({
    topic: {
        type: String,
        required: [true, "First Name is required"]
    },
    questionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Question
        }
    ]
});

const Topic = mongoose.model("topic", TopicSchema);

module.exports = Topic;
