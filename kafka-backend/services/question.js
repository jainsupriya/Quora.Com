const Question = require("../models/question");
const User = require("../models/user");
const Topic = require("../models/topic");
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
        case "post/question":
            Question.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Topic
                        .findByIdAndUpdate(
                            "5cd084810892c945c23869ae",
                            { $addToSet: {allTopic: result.topicList.split(", ")} }
                        )
                        .then((result, err) => {
                            if (err) {
                                console.log(err)
                                // myCallback(err, null, callback);
                            } else {
                                console.log(result)
                            }
                        })
                        User
                            .findOneAndUpdate(
                                {_id:msg.reqBody.questionOwner},
                                { $addToSet: { myQuestionList: result._id, interestedTopicList: result.topicList.split(", ")} }
                            )
                            // .updateOne({sqlUserId:msg.reqBody.questionOwner},{ $addToSet: { myQuestionList: result._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    Activity
                                        .create({
                                            userId: msg.reqBody.questionOwner,
                                            activityType: "CREATE_QUESTION",
                                            createdQuestion: result._id
                                        })
                                        .then((result2, err2) => {
                                            if (err2) {
                                                myCallback(err2, null, callback);
                                            } else {
                                                console.log(
                                                    "__________result1_________________\n",
                                                    result1
                                                );
                                                console.log(
                                                    "__________result2_________________\n",
                                                    result2
                                                );
                                                myCallback(null, result, callback);
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
        case "get/question":
            Question.find({ _id: msg.reqBody.questionId })
                .populate({ 
                    path: 'answerList',
                    populate: {
                    path: 'answerOwner',
                    select: 'profileImg lname fname',
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
        case "get/questions":
            Question.find({})
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
        case "get/questions/byUserId/:userId":
            Question
                .find({questionOwner: msg.reqBody.userId})
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
        case "get/questions/searchByQuestion/:searchQuery":
            Question.find({question: { $regex : msg.reqBody.searchQuery }})
                .populate('answerList')                
                .populate('questionOwner')                
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
        case "get/questions/searchByTopic/:searchQuery":
            Question
                .find({topicList: { $regex : msg.reqBody.searchQuery }})
                .populate({ 
                    path: 'answerList',
                    populate: [
                        // {
                        //     path: 'commentList',
                        //     options: {limit: 1},  
                        // },
                        {
                            path: 'answerOwner',
                            select: 'profileImg lname fname',
                        }
                    ],
                    options: {limit: 1},
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
        case "get/questions/searchTopic/:searchQuery":

            Question
                .find({topicList: { $regex : msg.reqBody.searchQuery}})
                .populate({ 
                    path: 'answerList',
                    populate: [
                        // {
                        //     path: 'commentList',
                        //     options: {limit: 1},  
                        // },
                        {
                            path: 'answerOwner',
                            select: 'profileImg lname fname',
                        }
                    ],
                    options: {limit: 1},
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
        case "put/question/:questionId":
            Question.findOneAndUpdate(
                { _id: msg.reqBody.questionId },
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
        case "delete/question/:questionId":
            Question.remove({ _id: msg.reqBody.questionId })
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
