const User = require("../models/user");
const Answer = require("../models/answer");
const Question = require("../models/question");
const Content = require("../models/content");
const mysql = require("mysql");
const pool = require("../config/mysqlConnection");
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
        case "get/user/:userId":
            User.find({ _id: msg.reqBody.userId })
                // .find({ sqlUserId: msg.reqBody.userId })
                .then((result, err) => {
                    myCallback(err, result, callback);
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/users/searchByUsername/:usernameQuery":
            User.find({username: { $regex : msg.reqBody.usernameQuery }},{fname:1,lname:1, _id:1})
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
            // pool.getConnection(function(err, connection) {
            //     if (err) {
            //         console.error("error connecting: " + err.stack);
            //         return;
            //     }
            //     let queryString = `SELECT * FROM users WHERE username LIKE '%${
            //         msg.reqBody.usernameQuery
            //     }%';`;
            //     console.log(queryString);
            //     connection.query(queryString, (err, rows, fields) => {
            //         if (err) {
            //             myCallback(err, null, callback);
            //         } else {
            //             myCallback(err, rows, callback);
            //         }
            //     });
            // });
            break;
        case "get/users":
            pool.getConnection(function(err, connection) {
                if (err) {
                    myCallback(err, null, callback);
                    console.error("error connecting: " + err.stack);
                    return;
                }
                let queryString = `SELECT * FROM users WHERE 1;`;
                console.log(queryString);
                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        User.find({})
                            .then((result, err) => {
                                if (err) {
                                    myCallback(err, null, callback);
                                } else {
                                    resD = { mongo: result, sql: rows };
                                    myCallback(err, resD, callback);
                                }
                            })
                            .catch(err => {
                                myCallback(err, null, callback);
                            });
                    }
                });
            });
            break;
        case "get/userWith/QuestionFollowingList/:userId":
            User.find({ _id: msg.reqBody.userId })
                .populate("questionFollowingList")
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(err, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/userWith/myQuestionList/:userId":
            User.find({_id:msg.reqBody.userId})
                .populate("myQuestionList")
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
        case "get/usersWith/QuestionFollowingList":
            User.find({})
                .populate("questionFollowingList")
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
        case "get/userWith/FollowingUserList/:userId":
            User.find({ _id: msg.reqBody.userId })
                .select('followingUserList')
                .populate({ 
                    path: 'followingUserList',
                    select: 'profileImg lname fname',
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
        case "get/usersWith/FollowingUserList":
            User.find({})
                .populate("followingUserList")
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
        case "get/userWith/relatedUserList/:userId":
            User
                .aggregate(
                    [
                        // {$match : true},
                        {   
                            // $match : { _id : "5cbe44cb5445656fa98b6f7e" },
                            $project: { 
                                followingUserList:1, 
                                followersUserList: 1,
                                _id: 1,
                                all: { $setUnion: [ "$followingUserList", "$followersUserList" ] },
                                // userId:{$eq:["$_id","5cbe44cb5445656fa98b6f7e"]}
                            } 
                        }
                    ]
                )
                // .find({ _id: msg.reqBody.userId })
                // .select('followersUserList')
                // .populate({ 
                //     path: 'followersUserList',
                //     select: 'profileImg lname fname',
                // })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        User.populate(result, {path: 'all'}, function(err, allRelatedUsers) {
                            // console.log(allRelatedUsers)
                            // Your populated translactions are inside populatedTransactions
                            myCallback(null, allRelatedUsers, callback);
                        });
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/userWith/FollowersUserList/:userId":
            User.find({ _id: msg.reqBody.userId })
                .select('followersUserList')
                .populate({ 
                    path: 'followersUserList',
                    select: 'profileImg lname fname',
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
        case "get/usersWith/FollowersUserList":
            User.find({})
                .populate("followersUserList")
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
        case "get/userWith/BookmarkAnswerList/:userId":
            User.find({ _id: msg.reqBody.userId })
                // .populate({ path: "bookmarkedAnswerList", model: Answer })
                .populate({ 
                    path: 'bookmarkedAnswerList',
                    populate: [
                        {
                            path: 'questionId',
                        }
                    ],
                    model: Answer,
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
        case "get/usersWith/BookmarkAnswerList":
            User.find({})
                .populate({ path: "bookmarkedAnswerList", model: Answer })
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
        case "get/usersWithAllTypeContent":
            User.find({})
                .populate({ path: "questionFollowingList", model: Question })
                .populate({ path: "myQuestionList", model: Question })
                .populate({ path: "myAnswerList", model: Answer })
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
        case "put/user/incView/:userId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $push: { profileViews: Date.now() } },
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
        case "put/user/followQuestion/:userId/:questionId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $addToSet: { questionFollowingList: msg.reqBody.questionId } }
            )
                // .updateOne({sqlUserId:msg.reqBody.userId},{ $addToSet: { questionFollowingList: msg.reqBody.questionId } })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Activity
                            .create({
                                userId: msg.reqBody.userId,
                                activityType: "FOLLOW_QUESTION",
                                followedQuestion: msg.reqBody.questionId
                            })
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    Question
                                        .findOneAndUpdate(
                                            {_id: msg.reqBody.questionId},
                                            {$addToSet: { followersUserList: msg.reqBody.userId }}
                                        )
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
        case "put/user/unFollowQuestion/:userId/:questionId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $pull: { questionFollowingList: msg.reqBody.questionId } }
            )
                // .updateOne({sqlUserId:msg.reqBody.userId},{ $pull: { questionFollowingList: msg.reqBody.questionId } })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Question
                            .findOneAndUpdate(
                                {_id: msg.reqBody.questionId},
                                {$pull: { followersUserList: msg.reqBody.userId }}
                            )
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log(
                                        "__________result1_________________\n",
                                        result1
                                    );
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
        case "put/user/followUser/:u1/:u2":
            User.findOneAndUpdate(
                { _id: msg.reqBody.u2 },
                { $addToSet: { followingUserList: msg.reqBody.u1 } }
            )
                // .updateOne({sqlUserId:msg.reqBody.u2},{ $addToSet: { followingUserList: msg.reqBody.u1 } })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        // console.log(result._id)
                        User.findOneAndUpdate(
                            { _id: msg.reqBody.u1 },
                            { $addToSet: { followersUserList: msg.reqBody.u2 } }
                        )
                            // .updateOne({sqlUserId:msg.reqBody.u1},{ $addToSet: { followingUserList: result[0]._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result
                                    );
                                    myCallback(null, result1, callback);
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
        case "put/user/unFollowUser/:u1/:u2":
            User.findOneAndUpdate(
                { _id: msg.reqBody.u2 },
                { $pull: { followingUserList: msg.reqBody.u1 } }
            )
                // .updateOne({sqlUserId:msg.reqBody.u2},{ $pull: { followingUserList: msg.reqBody.u1 } })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        // console.log(result._id)
                        User.findOneAndUpdate(
                            { _id: msg.reqBody.u1 },
                            { $pull: { followersUserList: msg.reqBody.u2 } }
                        )
                            // .updateOne({sqlUserId:msg.reqBody.u1},{ $pull: { followingUserList: result[0]._id } })
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result
                                    );
                                    myCallback(null, result1, callback);
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
        case "put/user/bookmarkAnswer/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $addToSet: { bookmarkedAnswerList: msg.reqBody.answerId } },
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Answer
                            .findByIdAndUpdate(msg.reqBody.answerId,{$inc: { bookmarkCount: 1}})
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result1
                                    );
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
        case "put/user/unBookmarkAnswer/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $pull: { bookmarkedAnswerList: msg.reqBody.answerId } },
                { new: true }
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        Answer
                            .findByIdAndUpdate(msg.reqBody.answerId,{$inc: { bookmarkCount: -1}})
                            .then((result1, err1) => {
                                if (err1) {
                                    myCallback(err1, null, callback);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result1
                                    );
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
        case "put/user/bookmarkQuestion/:userId/:questionId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                {
                    $addToSet: {
                        bookmarkedQuestionList: msg.reqBody.questionId
                    }
                },
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
        case "put/user/:userId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                msg.reqBody.body,
                { new: true }
            )
                // .findOneAndUpdate({ sqlUserId: msg.reqBody.userId }, msg.reqBody.body)
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
        case "put/file/updateProfileImg":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                {profileImg: msg.reqBody.imgUrl},
                { new: true }
            )
                // .findOneAndUpdate({ sqlUserId: msg.reqBody.userId }, msg.reqBody.body)
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
        case "delete/user/:userId":
            pool.getConnection(function(err, connection) {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    return;
                }
                let queryString = `UPDATE users
                SET password = "deleted"
                WHERE id = ${mysql.escape(
                    msg.reqBody.userId
                )};`;
                // let queryString = `DELETE FROM users WHERE id = ${mysql.escape(
                //     msg.reqBody.userId
                // )};`;
                console.log(queryString);
                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        console.log(err);
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, rows, callback);
                        // User.remove({ sqlUserId: msg.reqBody.userId })
                        //     .then((result, err) => {
                        //         if (err) {
                        //             myCallback(err, null, callback);
                        //         } else {
                        //             resD = { sql: rows, mongo: result };
                        //             myCallback(null, resD, callback);
                        //         }
                        //     })
                        //     .catch(err => {
                        //         myCallback(err, null, callback);
                        //     });
                    }
                });
                // console.log("connected as id " + connection.threadId);
            });
            break;
        default:
            myCallback("msg api missing", null, callback);
            break;
    }
}

exports.handle_request = handle_request;
