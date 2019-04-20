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
    console.log("/get/user");
    var reqMsg = {
        api: "get/user",
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
