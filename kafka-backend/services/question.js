const Question = require("../models/question");
const User = require("../models/user");
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
                        User
                            .updateOne({_id:msg.reqBody.questionOwner},{ $addToSet: { myQuestionList: result._id, interestedTopicList: result.topicList.split(", ")} })
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
            Question.find({question: { $regex : msg.reqBody.searchQuery, $options : 'i' }})
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
            Question.find({topicList: { $regex : msg.reqBody.searchQuery, $options : 'i' }})
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
            Question.find({topicList: { $regex : msg.reqBody.searchQuery, $options : 'i' }})
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
                        // let respon = null;
                        // console.log("-------------********************");
                        // result.map(res => {
                        //     if(res.anserList !== null){
                        //         respon = res.answerList
                        //     }
                        // })
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
