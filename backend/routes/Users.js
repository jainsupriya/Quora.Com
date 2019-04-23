const express = require("express");
const UserRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "user";

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
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

UserRoutes.get("/user/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/user/:userId");
    var reqMsg = {
        api: "get/user/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

// search user by username
UserRoutes.get("/users/searchByUsername/:usernameQuery", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/users/searchByUsername/:usernameQuery");
    var reqMsg = {
        api: "get/users/searchByUsername/:usernameQuery",
        reqBody: { usernameQuery: req.params.usernameQuery }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
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
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});
// get users with question list
UserRoutes.get("/usersWithQuestionList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWithQuestionList");
    var reqMsg = {
        api: "get/usersWithQuestionList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

// get users with following user list
UserRoutes.get("/usersWithFollowingUserList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWithFollowingUserList");
    var reqMsg = {
        api: "get/usersWithFollowingUserList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

// get users with following user list
UserRoutes.get("/usersWithFollowersUserList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWithFollowersUserList");
    var reqMsg = {
        api: "get/usersWithFollowersUserList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

// get users with bookmarked answer list
UserRoutes.get("/usersWithBookmarkAnswerList", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/usersWithBookmarkAnswerList");
    var reqMsg = {
        api: "get/usersWithBookmarkAnswerList",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
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
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
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
        reqBody: {userId: req.params.userId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
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
        reqBody: {userId: req.params.userId, questionId: req.params.questionId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
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
        reqBody: {u1: req.params.u1, u2: req.params.u2}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

UserRoutes.put("/user", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user");
    var reqMsg = {
        api: "put/user",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
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
        reqBody: {userId: req.params.userId, answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

// bookmark question 
// {
//     UserId
//     questionId
// }
UserRoutes.put("/user/bookmarkQuestion", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/user/bookmark");
    var reqMsg = {
        api: "put/user/bookmark",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

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
        if (err) {
            console.log(err);
            res.send({
                status: 422,
                msg: "Fail",
                data: err
            });
        } else {
            console.log(results);
            res.send({
                status: 200,
                msg: "Success",
                data: results
            });
        }
    });
});

module.exports = UserRoutes;
