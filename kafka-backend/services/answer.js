const Answer = require("../models/answer");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/answer":
            Answer.create(msg.reqBody)
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
        case "get/answer":
            Answer.find({ _id: msg.reqBody.answerId })
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
        case "get/answers":
            Answer.find({})
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
        case "put/answer/:answerId":
            Answer.findOneAndUpdate(
                { _id: msg.reqBody.answerId },
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
        case "delete/answer/:answerId":
            Answer.remove({ _id: msg.reqBody.answerId })
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
