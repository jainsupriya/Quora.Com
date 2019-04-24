const User = require("../models/user");
const Answer = require("../models/answer");
const Question = require("../models/question");
const mysql = require("mysql");
const pool = require("../config/mysqlConnection");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "get/user/:userId":
            User
                .find({ _id: msg.reqBody.userId })
                // .find({ sqlUserId: msg.reqBody.userId })
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
        case "get/users/searchByUsername/:usernameQuery":
            pool.getConnection(function(err, connection) {
                if (err) {
                console.error("error connecting: " + err.stack);
                return;
                }
                let queryString = 
                `SELECT * FROM users WHERE username LIKE '%${msg.reqBody.usernameQuery}%';`;
                console.log(queryString)
                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                        callback(err, err);
                    }else{
                        callback(null, rows);
                    }
                })
                console.log("connected as id " + connection.threadId);
            });
            break;
        case "get/users":
            var conn;  
            let ans;
            pool.getConnection(function(err, connection) {
                if (err) {
                console.error("error connecting: " + err.stack);
                return;
                }
                conn = connection;
            
                let queryString = 
                `SELECT * FROM users WHERE 1;`;
                console.log(queryString)
                conn.query(queryString, (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                        callback(err, err);
                    }else{
                        ans = rows;
                        // callback(null, rows);
                        // findNewUser(conn,rows,callback)
                        // findNewUser(conn,rows,callback)
                        User.find({})
                            .then((result, err) => {
                                if (err) {
                                    console.log("__________err_________________\n", err);
                                    callback(err, err);
                                } else {
                                    console.log(
                                        "__________result_________________\n",
                                        result
                                    );
                                    resD = {mongo: result, sql: ans}
                                    callback(null, resD);
                                }
                            })
                            .catch(err => {
                                console.log("__________err_________________\n", err);
                                callback(err, err);
                            });
                    }
                })
                console.log("connected as id " + connection.threadId);
            });
            break;
        case "get/userWith/QuestionFollowingList/:userId":
            User
                .find({_id:msg.reqBody.userId})
                .populate("questionFollowingList")
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
        case "get/usersWith/QuestionFollowingList":
            User
                .find({})
                .populate("questionFollowingList")
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
        case "get/userWith/FollowingUserList/:userId":
            User
                .find({_id:msg.reqBody.userId})
                .populate("followingUserList")
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
        case "get/usersWith/FollowingUserList":
            User
                .find({})
                .populate("followingUserList")
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
        case "get/userWith/FollowersUserList/:userId":
            User
                .find({_id: msg.reqBody.userId})
                .populate("followersUserList")
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
        case "get/usersWith/FollowersUserList":
            User
                .find({})
                .populate("followersUserList")
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
        case "get/userWith/BookmarkAnswerList/:userId":
            User
                .find({_id: msg.reqBody.userId})
                .populate({path: "bookmarkedAnswerList", model:Answer})
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
        case "get/usersWith/BookmarkAnswerList":
            User
                .find({})
                .populate({path: "bookmarkedAnswerList", model:Answer})
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
        case "get/usersWithAllTypeContent":
            User
                .find({})
                .populate({path: "questionFollowingList", model:Question})
                .populate({path: "myQuestionList", model:Question})
                .populate({path: "myAnswerList", model:Answer})
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
        case "put/user/incView/:userId":
            User
                .updateOne({_id:msg.reqBody.userId},{ $push: { profileViews: Date.now()} },{new: true})
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
        case "put/user/followQuestion/:userId/:questionId":
            User
                .updateOne({_id:msg.reqBody.userId},{ $addToSet: { questionFollowingList: msg.reqBody.questionId } })
                // .updateOne({sqlUserId:msg.reqBody.userId},{ $addToSet: { questionFollowingList: msg.reqBody.questionId } })
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
        case "put/user/followUser/:u1/:u2":
            User
                .updateOne({_id:msg.reqBody.u2},{ $addToSet: { followingUserList: msg.reqBody.u1 } })
                // .updateOne({sqlUserId:msg.reqBody.u2},{ $addToSet: { followingUserList: msg.reqBody.u1 } })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        // console.log(result._id)
                        User
                            .updateOne({_id:msg.reqBody.u1},{ $addToSet: { followersUserList: msg.reqBody.u2 } })
                            // .updateOne({sqlUserId:msg.reqBody.u1},{ $addToSet: { followingUserList: result[0]._id } })
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
                                    callback(null, result1);
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
        case "put/user/bookmarkAnswer/:userId/:answerId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $addToSet: { bookmarkedAnswerList: msg.reqBody.answerId } },
                {new: true}
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
        case "put/user/bookmarkQuestion/:userId/:questionId":
            User.findOneAndUpdate(
                { _id: msg.reqBody.userId },
                { $addToSet: { bookmarkedQuestionList: msg.reqBody.questionId } },
                {new: true}
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
        case "put/user/:userId":
            User
                .findOneAndUpdate({ _id: msg.reqBody.userId }, msg.reqBody.body, {new:true})
                // .findOneAndUpdate({ sqlUserId: msg.reqBody.userId }, msg.reqBody.body)
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
        case "delete/user/:userId":
            pool.getConnection(function(err, connection) {
                if (err) {
                console.error("error connecting: " + err.stack);
                return;
                }
                // conn = connection;
            
                let queryString = 
                `DELETE FROM users WHERE id = ${mysql.escape(msg.reqBody.userId)};`;
                console.log(queryString)
                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                        callback(err, err);
                    }else{
                        User
                        .remove({ sqlUserId: msg.reqBody.userId })
                        .then((result, err) => {
                            if (err) {
                                console.log("__________err_________________\n", err);
                                callback(err, err);
                            } else {
                                console.log(
                                    "__________result_________________\n",
                                    result
                                );
                                resD = {sql: rows, mongo: result}
                                callback(null, resD);
                            }
                        })
                        .catch(err => {
                            console.log("__________err_________________\n", err);
                            callback(err, err);
                        });
                    }
                })
                console.log("connected as id " + connection.threadId);
            });
            break;
        default:
            callback(null, "msg api missing");
            break;
    }
}

exports.handle_request = handle_request;
