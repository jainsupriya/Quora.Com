const Content = require("../models/content");
const Question = require("../models/question");
const Answer = require("../models/answer");
const Comment = require("../models/comment");
const User = require("../models/user");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/content":
            Content.create(msg.reqBody)
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
        case "get/content/:contentId":
            Content.find({ _id: msg.reqBody.contentId })
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
        case "get/contents":
            Content
                .find({})
                .populate('contentId')
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
        case "put/content/:contentId":
            Content.findOneAndUpdate(
                { _id: msg.reqBody.contentId },
                msg.reqBody.body
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
        case "delete/content/:contentId":
            Content.remove({ _id: msg.reqBody.contentId })
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
            callback("msg api missing", null);
            break;
    }
}

exports.handle_request = handle_request;
