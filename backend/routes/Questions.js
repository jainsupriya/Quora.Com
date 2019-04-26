const express = require("express");
const QuestionRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "question";

// question
// questionOwner[]
// topicList[]
// followersUserList[]
// answerList[]
// postedTime

QuestionRoutes.post("/question", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Question");
    var reqMsg = {
        api: "post/question",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

QuestionRoutes.get("/question/:questionId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/question");
    var reqMsg = {
        api: "get/question",
        reqBody: { questionId: req.params.questionId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

QuestionRoutes.get("/questions", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/questions");
    var reqMsg = {
        api: "get/questions",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

QuestionRoutes.get("/questions/byUserId/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/questions/byUserId/:userId");
    var reqMsg = {
        api: "get/questions/byUserId/:userId",
        reqBody: {userId: req.params.userId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// search question by question name
QuestionRoutes.get("/questions/searchByQuestion/:searchQuery", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/questions/searchByQuestion/:searchQuery");
    var reqMsg = {
        api: "get/questions/searchByQuestion/:searchQuery",
        reqBody: {searchQuery: req.params.searchQuery}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// search question by topic
QuestionRoutes.get("/questions/searchByTopic/:searchQuery", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/questions/searchByTopic/:searchQuery");
    var reqMsg = {
        api: "get/questions/searchByTopic/:searchQuery",
        reqBody: {searchQuery: req.params.searchQuery}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

QuestionRoutes.put("/question/:questionId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/question/:questionId");
    var reqMsg = {
        api: "put/question/:questionId",
        reqBody: {questionId: req.params.questionId, body: req.body}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

QuestionRoutes.delete("/question/:questionId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete question");
    var reqMsg = {
        api: "delete/question/:questionId",
        reqBody: { questionId: req.params.questionId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

module.exports = QuestionRoutes;
