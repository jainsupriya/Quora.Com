const Question = require("../models/question");
const User = require("../models/user");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/question":
            Question.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        User
                            .updateOne({_id:msg.reqBody.questionOwner},{ $addToSet: { myQuestionList: result._id } })
                            // .updateOne({sqlUserId:msg.reqBody.questionOwner},{ $addToSet: { myQuestionList: result._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    console.log("__________err1_________________\n", err1);
                                    callback(err, err1);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result
                                    );
                                    console.log(
                                        "__________result1_________________\n",
                                        result1
                                    );
                                    callback(null, result);
                                }
                            })
                            .catch(err1 => {
                                console.log("__________err1_________________\n", err1);
                                callback(err, err1);
                            });
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback(err, err);
                });
            break;
        case "get/question":
            Question.find({ _id: msg.reqBody.questionId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        case "get/questions":
            Question.find({})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        case "get/questions/byUserId/:userId":
            Question
                .find({questionOwner: msg.reqBody.userId})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        case "get/questions/search/:searchQuery":
            Question.find({topic: { $regex : msg.reqBody.searchQuery, $options : 'i' }})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        case "put/question/:questionId":
            Question.findOneAndUpdate(
                { _id: msg.reqBody.questionId },
                msg.reqBody.body
            )
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        case "delete/question/:questionId":
            Question.remove({ _id: msg.reqBody.questionId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
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
                    callback(err, err);
                });
            break;
        default:
            callback(err, "msg api missing");
            break;
    }
}

exports.handle_request = handle_request;
