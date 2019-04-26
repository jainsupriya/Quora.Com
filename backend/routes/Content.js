const express = require("express");
const ContentRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "content";
// CREATE_QUESTION
// FOLLOW_QUESTION
// CREATE_ANSWER

ContentRoutes.post("/content", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Content");
    var reqMsg = {
        api: "post/content",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/:contentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/:contentId");
    var reqMsg = {
        api: "get/content/:contentId",
        reqBody: { contentId: req.params.contentId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/byUserId/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/byUserId/:userId");
    var reqMsg = {
        api: "get/content/byUserId/:userId",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/byUserId/:userId/onlyAnswers", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/byUserId/:userId/onlyAnswers");
    var reqMsg = {
        api: "get/content/byUserId/:userId/onlyAnswers",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/byUserId/:userId/onlyQuestions", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/byUserId/:userId/onlyQuestions");
    var reqMsg = {
        api: "get/content/byUserId/:userId/onlyQuestions",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/byUserId/:userId/onlyFollowQuestions", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/byUserId/:userId/onlyFollowQuestions");
    var reqMsg = {
        api: "get/content/byUserId/:userId/onlyFollowQuestions",
        reqBody: { userId: req.params.userId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/content/byUserId/:userId/year/:year", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/content/byUserId/:userId/year/:year");
    var reqMsg = {
        api: "get/content/byUserId/:userId/year/:year",
        reqBody: { userId: req.params.userId, year: req.params.year }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.get("/contents", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/contents");
    var reqMsg = {
        api: "get/contents",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.put("/content/:contentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/content/:contentId");
    var reqMsg = {
        api: "put/content/:contentId",
        reqBody: {contentId: req.params.contentId, body: req.body}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

ContentRoutes.delete("/content/:contentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete content");
    var reqMsg = {
        api: "delete/content/:contentId",
        reqBody: { contentId: req.params.contentId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

module.exports = ContentRoutes;
