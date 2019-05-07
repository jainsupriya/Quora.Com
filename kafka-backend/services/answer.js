const Answer = require("../models/answer");
const User = require("../models/user");
const Question = require("../models/question");
const Content = require("../models/content");
const Activity = require("../models/activity");

myCallback = (err, result, callback) => {
    if (err) {
        console.log("__________err_________________\n", err);
        callback(null, {
            status: 422,
            msg: "Fail",
            data: err
        });
    } else {
        console.log("__________result_________________\n", result);
        callback(null, {
            status: 200,
            msg: "Success",
            data: result
        });
    }
};

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/answer":
            Answer.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Question.findOneAndUpdate(
                            { _id: msg.reqBody.questionId },
                            { $addToSet: { answerList: result._id } }
                        )
                            // .updateOne({sqlUserId:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    User.findOneAndUpdate(
                                        { _id: msg.reqBody.answerOwner },
                                        {
                                            $addToSet: {
                                                myAnswerList: result._id
                                            }
                                        }
                                    )
                                        // .updateOne({sqlUserId:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                                        .then((result2, err2) => {
                                            if (err2) {
                                                myCallback(
                                                    err2,
                                                    null,
                                                    callback
                                                );
                                            } else {
                                                Activity.create({
                                                    userId:
                                                        msg.reqBody.answerOwner,
                                                    activityType:
                                                        "CREATE_ANSWER",
                                                    createdAnswer: result._id
                                                })
                                                    // .updateOne({sqlUserId:msg.reqBody.answerOwner},{ $addToSet: { myAnswerList: result._id } })
                                                    .then((result3, err3) => {
                                                        if (err3) {
                                                            myCallback(
                                                                err3,
                                                                null,
                                                                callback
                                                            );
                                                        } else {
                                                            console.log(
                                                                "__________result1_________________\n",
                                                                result1
                                                            );
                                                            console.log(
                                                                "__________result2_________________\n",
                                                                result2
                                                            );
                                                            console.log(
                                                                "__________result3_________________\n",
                                                                result3
                                                            );
                                                            myCallback(
                                                                null,
                                                                result,
                                                                callback
                                                            );
                                                        }
                                                    })
                                                    .catch(err3 => {
                                                        myCallback(
                                                            err3,
                                                            null,
                                                            callback
                                                        );
                                                    });
                                            }
                                        })
                                        .catch(err2 => {
                                            myCallback(err2, null, callback);
                                        });
                                }
                            })
                            .catch(err1 => {
                                myCallback(err1, null, callback);
                            });
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answer/:answerId":
            Answer.find({ _id: msg.reqBody.answerId })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answerWithCommentList/:answerId":
            Answer.find({ _id: msg.reqBody.answerId })
                .populate({
                    path: "commentList",
                    populate: {
                        path: "commentOwner",
                        select: "profileImg lname fname"
                    }
                })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers":
            Answer.find({})
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByViews/:userId":
            Answer
                .find({answerOwner:msg.reqBody.userId},{answer:0})
                .sort({ views: -1 })
                .limit(10)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByViews":
            Answer.find()
                .sort({ views: -1 })
                .limit(10)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByUpVotes/:userId":
            Answer.find({answerOwner:msg.reqBody.userId},{answer:0})
                .sort({ upVotesCount: -1 })
                .limit(10)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByUpVotes":
            Answer
                .find()
                .sort({ downVotesCount: -1 })
                .limit(5)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByDownVotes/:userId":
            Answer
                .find({answerOwner:msg.reqBody.userId},{answer:0})
                .sort({ downVotes: -1 })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByDownVotes":
            Answer
                .find()
                .sort({ downVotes: -1 })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/orderByBookmarks/:userId":
            Answer
                .find({answerOwner:msg.reqBody.userId},{answer:0})
                .sort({ bookmarkCount: -1 })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answers/byUserId/:userId":
            Answer.find({ answerOwner: msg.reqBody.userId })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/answersWith/comments":
            Answer.find({})
                .populate("commentList")
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/upvoteInc/:userId/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                {
                    $addToSet: { upVotes: msg.reqBody.userId },
                    $inc: { votes: 1, upVotesCount: 1 }
                },
                // {$inc: {votes: 1,upVotes: 1}},
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/upvoteDec/:userId/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                {
                    $pull: { upVotes: msg.reqBody.userId },
                    $inc: { votes: -1, upVotesCount: -1 }
                },
                // {$inc: {votes: 1,upVotes: 1}},
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/downvote/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $addToSet: { downVoteAnswerList: msg.reqBody.answerId } },
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Answer.findOneAndUpdate(
                            { _id: msg.reqBody.answerId },
                            {
                                $addToSet: { downVoters: msg.reqBody.userId },
                                $inc: { downVotesCount: 1 }
                            }
                        )
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log("__________result1_________________\n", result1);
                                    myCallback(null, result, callback);
                                }
                            })
                            .catch(err1 => {
                                myCallback(err1, null, callback);
                            });
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/undoDownvote/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $pull: { downVoteAnswerList: msg.reqBody.answerId } },
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Answer.findOneAndUpdate(
                            { _id: msg.reqBody.answerId },
                            {
                                $pull: { downVoters: msg.reqBody.userId },
                                $inc: { downVotesCount: -1 }
                            }
                        )
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log("__________result1_________________\n", result1);
                                    myCallback(null, result, callback);
                                }
                            })
                            .catch(err1 => {
                                myCallback(err1, null, callback);
                            });
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/view/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                { $inc: { views: 1 } },
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/answer/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
                msg.reqBody.body,
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "delete/answer/:answerId":
            Answer.remove({ _id: msg.reqBody.answerId })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        default:
            myCallback("msg api missing", null, callback);
            break;
    }
}

exports.handle_request = handle_request;
