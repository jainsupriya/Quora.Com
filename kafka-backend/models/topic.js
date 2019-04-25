const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    topic: {
        type: String,
        required: [true, "First Name is required"]
    },
    questionList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "question"
        }
    ]
});

const Topic = mongoose.model("topic", TopicSchema);

module.exports = Topic;
