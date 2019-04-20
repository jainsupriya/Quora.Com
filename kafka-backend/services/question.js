const Question = require("../models/question");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/question":
            Question.create(msg.reqBody)
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
