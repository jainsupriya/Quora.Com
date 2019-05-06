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
        case "post/activity":
            Activity.create(msg.reqBody)
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
        case "get/activity/:activityId":
            Activity
                .find({ _id: msg.reqBody.activityId })
                .populate('activityId')
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
        case "get/activity/byUserId/:userId":
            Activity
                .find({ userId: msg.reqBody.userId })
                // .populate({path: 'createdQuestion',populate: {path: 'answerList', model: "answer"}, model: "question"})
                .populate({path: 'createdQuestion', model: "question"})
                // .populate({path: 'followedQuestion',populate: {path: 'answerList', model: "answer"}, model: "question"})
                .populate({path: 'followedQuestion', model: "question"})
                .populate({path: 'createdAnswer',populate: {path: 'questionId', model: "question"}, model: "answer"})
                // .populate({path: 'createdAnswer',populate: {path: 'questionId', model: "question"},populate: {path: 'commentList', model: "comment"}, model: "answer"})
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
        case "get/activity/byUserId/:userId/onlyAnswers":
            Activity
                .find({ userId: msg.reqBody.userId, activityType: "CREATE_ANSWER" })
                .populate({path: 'createdAnswer',populate: {path: 'questionId', model: "question"}, model: "answer"})
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
        case "get/activity/byUserId/:userId/onlyQuestions":
            Activity
                .find({ userId: msg.reqBody.userId, activityType: "CREATE_QUESTION" })
                .populate({path: 'createdQuestion', model: "question"})
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
        case "get/activity/byUserId/:userId/onlyFollowQuestions":
            Activity
                .find({ userId: msg.reqBody.userId, activityType: "FOLLOW_QUESTION" })
                .populate({path: 'followedQuestion', model: "question"})
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
        case "get/activity/byUserId/:userId/year/:year":
            let gtYear = parseInt(msg.reqBody.year)
            let ltYear = parseInt(msg.reqBody.year)+1
            Activity
                .find({ 
                    userId: msg.reqBody.userId, 
                    timeStamp: {$gte:gtYear+"",$lt:ltYear+""} 
                })
                .populate('activityId')
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
        case "get/activitys":
            Activity
                .find({})
                // .populate('activityId')
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
        case "put/activity/:activityId":
            Activity.findOneAndUpdate(
                { _id: msg.reqBody.activityId },
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
        case "delete/activity/:activityId":
            Activity.remove({ _id: msg.reqBody.activityId })
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
