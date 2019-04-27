const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    activityType: {
        type: String,
        required: [true, "Activity Type is required"]
    },
    createdQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "question"
    },
    followedQuestion: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "question"
    },
    createdAnswer: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "answer"
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model("activity", ActivitySchema);
module.exports = Activity;
