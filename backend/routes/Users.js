const express = require("express");
const UserRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "user";
const redis = require("redis");
const EXP_TIME = 1;
const redisHmapMax = 4;

// Create Redis Client
let client = redis.createClient();
// var client = redis.createClient(
//   6379,
//   "redisforquora.gtvq8d.0001.usw1.cache.amazonaws.com",
//   {
//     no_ready_check: true
//   }
// );

client.on("connect", function() {
    console.log("Connected to Redis...");
});

// fname
// lname
// mobile
// dob
// gender
// email
// password
// employment{
//     position
//     company
//     startYear
//     endYear
//     current
//     description
// }
// education{
//     school
//     Concentration
//     secondaryConcentration
//     degreeType
//     graduationYear
//     current
//     description
// }
// location{
//     locationName
//     startYear
//     endYear
//     current
// }
// profileImg
// city
// state
// zipCode
// aboutMe
// profileCredential
// social{
//     youtube
//     twitter
//     facebook
//     linkedin
//     instagram
// }
// followingUserList[]
// followersUserList[]
// questionFollowingList[]
// topicFollowingList[]
// bookmarkedQuestionList[]

UserRoutes.post("/user", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post User");
    var reqMsg = {
        api: "post/user",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

UserRoutes.get("/user/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/user/:userId");
    client.hget("get/user/", req.params.userId, function(err, reply) {
        if (err) {
            console.log(err);
            res.status(422).send(err);
        } else {
            client.hlen("get/user/",(err,length)=>{
                if(length>=redisHmapMax){
                    client.hkeys("get/user/",(err,keys)=>{
                        console.log(keys[0])
                        client.hdel("get/user/",keys[0])
                    })
                }
            })
            if (reply) {
                res.status(200).send(JSON.parse(reply));
            } else {
                var reqMsg = {
                    api: "get/user/:userId",
                    reqBody: { userId: req.params.userId }
                };
                kafka.make_request(TOPIC, reqMsg, function(err, results) {
                    res.status(results.status).send(results.data);
                    client.hset(
                        "get/user/",
                        req.params.userId,
                        JSON.stringify(results.data)
                    );
                });
            }
        }
    });
});

// search user by username
UserRoutes.get("/users/searchByUsername/:usernameQuery", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/users/searchByUsername/:usernameQuery");

    client.hget("get/users/searchByUsername/", req.params.usernameQuery, function(err, reply) {
        if (err) {
            console.log(err);
            res.status(422).send(err);
        } else {
            client.hlen("get/users/searchByUsername/",(err,length)=>{
                if(length>=redisHmapMax){
                    client.hkeys("get/users/searchByUsername/",(err,keys)=>{
                        console.log(keys[0])
                        client.hdel("get/users/searchByUsername/",keys[0])
                    })
                }
            })
            if (reply) {
                res.status(200).send(JSON.parse(reply));
            } else {
                var reqMsg = {
                    api: "get/users/searchByUsername/:usernameQuery",
                    reqBody: { usernameQuery: req.params.usernameQuery }
                };
                kafka.make_request(TOPIC, reqMsg, function(err, results) {
                    res.status(results.status).send(results.data);
                    client.hset(
                        "get/users/searchByUsername/",
                        req.params.usernameQuery,
                        JSON.stringify(results.data)
                    );
                });
            }
        }
    });
});

UserRoutes.get("/users", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/users");
    var reqMsg = {
        api: "get/users",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with question following list
UserRoutes.get("/userWith/QuestionFollowingList/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/userWith/QuestionFollowingList/:userId");
    client.hget("get/userWith/QuestionFollowingList/", req.params.userId, function(err, reply) {
        if (err) {
            console.log(err);
            res.status(422).send(err);
        } else {
            client.hlen("get/userWith/QuestionFollowingList/",(err,length)=>{
                if(length>=redisHmapMax){
                    client.hkeys("get/userWith/QuestionFollowingList/",(err,keys)=>{
                        console.log(keys[0])
                        client.hdel("get/userWith/QuestionFollowingList/",keys[0])
                    })
                }
            })
            if (reply) {
                res.status(200).send(JSON.parse(reply));
            } else {
                var reqMsg = {
                    api: "get/userWith/QuestionFollowingList/:userId",
                    reqBody: { userId: req.params.userId }
                };
                kafka.make_request(TOPIC, reqMsg, function(err, results) {
                    res.status(results.status).send(results.data);
                    client.hset(
                        "get/userWith/QuestionFollowingList/",
                        req.params.userId,
                        JSON.stringify(results.data)
                    );
                });
            }
        }
    });
});

// get users with question following list
UserRoutes.get("/usersWith/QuestionFollowingList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWith/QuestionFollowingList");
    var reqMsg = {
        api: "get/usersWith/QuestionFollowingList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with following user list
UserRoutes.get("/userWith/FollowingUserList/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/userWith/FollowingUserList/:userId");
    var reqMsg = {
        api: "get/userWith/FollowingUserList/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with following user list
UserRoutes.get("/usersWith/FollowingUserList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWith/FollowingUserList");
    var reqMsg = {
        api: "get/usersWith/FollowingUserList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with following user list
UserRoutes.get("/userWith/FollowersUserList/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/userWith/FollowersUserList/:userId");
    var reqMsg = {
        api: "get/userWith/FollowersUserList/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with following user list
UserRoutes.get("/usersWith/FollowersUserList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWith/FollowersUserList");
    var reqMsg = {
        api: "get/usersWith/FollowersUserList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with bookmarked answer list
UserRoutes.get("/userWith/BookmarkAnswerList/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/userWith/BookmarkAnswerList/:userId");
    var reqMsg = {
        api: "get/userWith/BookmarkAnswerList/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users with bookmarked answer list
UserRoutes.get("/usersWith/BookmarkAnswerList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWith/BookmarkAnswerList");
    var reqMsg = {
        api: "get/usersWith/BookmarkAnswerList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get users user content All
UserRoutes.get("/usersWithAllTypeContent", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWithAllTypeContent");
    var reqMsg = {
        api: "get/usersWithAllTypeContent",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// Profile inc view
UserRoutes.put("/user/incView/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/incView/:userId");
    var reqMsg = {
        api: "put/user/incView/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// Follow a question
UserRoutes.put("/user/followQuestion/:userId/:questionId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/followQuestion/:userId/:questionId");
    var reqMsg = {
        api: "put/user/followQuestion/:userId/:questionId",
        reqBody: {
            userId: req.params.userId,
            questionId: req.params.questionId
        }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
        if(client.hexists(
            "get/userWith/QuestionFollowingList/",
            req.params.userId
        )){
            client.hdel("get/userWith/QuestionFollowingList/",req.params.userId)
        }
    });
});

// unFollow a question
UserRoutes.put("/user/unFollowQuestion/:userId/:questionId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/unFollowQuestion/:userId/:questionId");
    var reqMsg = {
        api: "put/user/unFollowQuestion/:userId/:questionId",
        reqBody: {
            userId: req.params.userId,
            questionId: req.params.questionId
        }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// Follow a User u2 is following u1
UserRoutes.put("/user/followUser/:u1/:u2", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/followUser/:u1/:u2");
    var reqMsg = {
        api: "put/user/followUser/:u1/:u2",
        reqBody: { u1: req.params.u1, u2: req.params.u2 }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// unFollow a User u2 is unfollowing u1
UserRoutes.put("/user/unFollowUser/:u1/:u2", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/unFollowUser/:u1/:u2");
    var reqMsg = {
        api: "put/user/unFollowUser/:u1/:u2",
        reqBody: { u1: req.params.u1, u2: req.params.u2 }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

UserRoutes.put("/user/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("put/user/:userId");
    var reqMsg = {
        api: "put/user/:userId",
        reqBody: { userId: req.params.userId, body: req.body }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
        if(client.hexists(
            "get/user/",
            req.params.userId
        )){
            client.hset(
                "get/user/",
                req.params.userId,
                JSON.stringify(results.data)
            );
        }
    });
});

// Bookmark an answer
UserRoutes.put("/user/bookmarkAnswer/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/bookmarkAnswer/:userId/:answerId");
    var reqMsg = {
        api: "put/user/bookmarkAnswer/:userId/:answerId",
        reqBody: { userId: req.params.userId, answerId: req.params.answerId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// unBookmark an answer
UserRoutes.put("/user/unBookmarkAnswer/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/unBookmarkAnswer/:userId/:answerId");
    var reqMsg = {
        api: "put/user/unBookmarkAnswer/:userId/:answerId",
        reqBody: { userId: req.params.userId, answerId: req.params.answerId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

UserRoutes.put(
    "/user/bookmarkQuestion/:userId/:questionId",
    (req, res, next) => {
        console.log(
            "===================================================================================================================================================="
        );
        console.log("/put/user/bookmarkQuestion/:userId/:questionId");
        var reqMsg = {
            api: "put/user/bookmarkQuestion/:userId/:questionId",
            reqBody: {
                userId: req.params.userId,
                questionId: req.params.questionId
            }
        };
        kafka.make_request(TOPIC, reqMsg, function(err, results) {
            res.status(results.status).send(results.data);
        });
    }
);

UserRoutes.delete("/user/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete user");
    var reqMsg = {
        api: "delete/user/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

module.exports = UserRoutes;
