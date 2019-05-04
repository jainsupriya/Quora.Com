const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    contentType: {
        type: String,
        required: [true, "Content Type is required"]
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "contentIdModel"
    },
    contentIdModel: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

const Content = mongoose.model("content", ContentSchema);
module.exports = Content;
