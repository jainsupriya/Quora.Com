const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    allTopic: [{
        type: String,
        required: [true, "Topic is required"]
    }]
});

const Topic = mongoose.model("topic", TopicSchema);

module.exports = Topic;
