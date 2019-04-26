const Content = require("../models/content");

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
        case "post/content":
            Content.create(msg.reqBody)
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
        case "get/content/:contentId":
            Content
                .find({ _id: msg.reqBody.contentId })
                .populate('contentId')
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
        case "get/content/byUserId/:userId":
            Content
                .find({ userId: msg.reqBody.userId })
                .populate('contentId')
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
        case "get/content/byUserId/:userId/onlyQuestions":
            Content
                .find({ userId: msg.reqBody.userId, contentType: "CREATE_QUESTION" })
                .populate('contentId')
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
        case "get/content/byUserId/:userId/onlyFollowQuestions":
            Content
                .find({ userId: msg.reqBody.userId, contentType: "FOLLOW_QUESTION" })
                .populate('contentId')
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
        case "get/content/byUserId/:userId/year/:year":
            let gtYear = parseInt(msg.reqBody.year)
            let ltYear = parseInt(msg.reqBody.year)+1
            Content
                .find({ 
                    userId: msg.reqBody.userId, 
                    timeStamp: {$gte:gtYear+"",$lt:ltYear+""} 
                })
                .populate('contentId')
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
        case "get/contents":
            Content
                .find({})
                // .populate('contentId')
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
        case "put/content/:contentId":
            Content.findOneAndUpdate(
                { _id: msg.reqBody.contentId },
                msg.reqBody.body
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
        case "delete/content/:contentId":
            Content.remove({ _id: msg.reqBody.contentId })
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
