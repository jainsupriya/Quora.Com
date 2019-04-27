const express = require("express");
const ActivityRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "activity";
// CREATE_QUESTION
// FOLLOW_QUESTION
// CREATE_ANSWER

// userId
// activityType
// createdQuestion
// followedQuestion
// createdAnswer
// timeStamp

ActivityRoutes.post("/activity", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Activity");
    var reqMsg = {
        api: "post/activity",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/:activityId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/:activityId");
    var reqMsg = {
        api: "get/activity/:activityId",
        reqBody: { activityId: req.params.activityId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/byUserId/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/byUserId/:userId");
    var reqMsg = {
        api: "get/activity/byUserId/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/byUserId/:userId/onlyAnswers", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/byUserId/:userId/onlyAnswers");
    var reqMsg = {
        api: "get/activity/byUserId/:userId/onlyAnswers",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/byUserId/:userId/onlyQuestions", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/byUserId/:userId/onlyQuestions");
    var reqMsg = {
        api: "get/activity/byUserId/:userId/onlyQuestions",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/byUserId/:userId/onlyFollowQuestions", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/byUserId/:userId/onlyFollowQuestions");
    var reqMsg = {
        api: "get/activity/byUserId/:userId/onlyFollowQuestions",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activity/byUserId/:userId/year/:year", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activity/byUserId/:userId/year/:year");
    var reqMsg = {
        api: "get/activity/byUserId/:userId/year/:year",
        reqBody: { userId: req.params.userId, year: req.params.year }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.get("/activitys", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/activitys");
    var reqMsg = {
        api: "get/activitys",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.put("/activity/:activityId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/activity/:activityId");
    var reqMsg = {
        api: "put/activity/:activityId",
        reqBody: {activityId: req.params.activityId, body: req.body}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

ActivityRoutes.delete("/activity/:activityId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete activity");
    var reqMsg = {
        api: "delete/activity/:activityId",
        reqBody: { activityId: req.params.activityId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

module.exports = ActivityRoutes;
