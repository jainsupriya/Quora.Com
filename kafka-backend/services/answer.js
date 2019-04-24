const Answer = require("../models/answer");
const User = require("../models/user");
const Question = require("../models/question");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/answer":
            Answer.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        Question
                            .updateOne({_id:msg.reqBody.questionId},{ $addToSet: { answerList: result._id } })
                            // .updateOne({sqlUserId:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    console.log("__________err1_________________\n", err1);
                                    callback("err", err1);
                                } else {
                                    User
                                        .updateOne({_id:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                                        // .updateOne({sqlUserId:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                                        .then((result2, err2) => {
                                            if (err2) {
                                                console.log("__________err2_________________\n", err2);
                                                callback("err", err2);
                                            } else {
                                                console.log(
                                                    "__________result_________________\n",
                                                    result
                                                );
                                                console.log(
                                                    "__________result1_________________\n",
                                                    result1
                                                );
                                                console.log(
                                                    "__________result2_________________\n",
                                                    result2
                                                );
                                                callback(null, result);
                                            }
                                        })
                                        .catch(err2 => {
                                            console.log("__________err2_________________\n", err2);
                                            callback("err", err2);
                                        });
                                }
                            })
                            .catch(err1 => {
                                console.log("__________err1_________________\n", err1);
                                callback("err", err1);
                            });
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answer":
            Answer.find({ _id: msg.reqBody.answerId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answers":
            Answer
                .find({})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answers/orderByViews":
            Answer
                .find().sort({views: -1})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answers/orderByUpVotes":
            Answer
                .find().sort({upVotesCount: -1})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answers/orderByDownVotes":
            Answer
                .find().sort({downVotes: -1})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answers/byUserId/:userId":
            Answer
                .find({answerOwner: msg.reqBody.userId})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "get/answersWith/comments":
            Answer
                .find({})
                .populate("commentList")
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "put/answer/upvoteInc/:userId/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                { $addToSet: { upVotes: msg.reqBody.userId }, $inc: {votes: 1, upVotesCount: 1}},
                // {$inc: {votes: 1,upVotes: 1}},
                {new : true}
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "put/answer/upvoteDec/:userId/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                { $pull: { upVotes: msg.reqBody.userId }, $inc: {votes: -1, upVotesCount: -1}},
                // {$inc: {votes: 1,upVotes: 1}},
                {new : true}
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "put/answer/downvote/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                {$addToSet: {downVoteAnswerList: msg.reqBody.answerId}},
                {new : true}
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "put/answer/view/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                {$inc: {views: 1}},
                {new : true}
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "put/answer/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                msg.reqBody.body,
                {new: true}
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        case "delete/answer/:answerId":
            Answer.remove({ _id: msg.reqBody.answerId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback("err", err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback("err", err);
                });
            break;
        default:
            callback("err", "msg api missing");
            break;
    }
}

exports.handle_request = handle_request;
