const Comment = require("../models/comment");
const Answer = require("../models/answer");

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
        case "post/comment":
            Comment.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Answer
                            .updateOne({_id:msg.reqBody.answerId},{ $addToSet: { commentList: result._id } })
                            .then((result1, err) => {
                                if (err) {
                                    myCallback(err, null, callback);
                                } else {
                                    console.log(
                                        "__________result1_________________\n",
                                        result1
                                    );
                                    myCallback(null, result, callback);
                                }
                            })
                            .catch(err => {
                                myCallback(err, null, callback);
                            });
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/comment":
            Comment.find({ _id: msg.reqBody.commentId })
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
        case "get/comments":
            Comment.find({})
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
        case "put/comment/:commentId":
            Comment.findOneAndUpdate(
                { _id: msg.reqBody.commentId },
                msg.reqBody.body,
                {new: true}
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
        case "delete/comment/:commentId":
            Comment.remove({ _id: msg.reqBody.commentId })
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
