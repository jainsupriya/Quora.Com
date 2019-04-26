const express = require("express");
const AnswerRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "answer";

// answer
// answerOwner[]
// imageList[]
// isAnonymous
// upVotes
// downVotes
// commentList[]
// postedTime

AnswerRoutes.post("/answer", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Answer");
    var reqMsg = {
        api: "post/answer",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answer/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answer");
    var reqMsg = {
        api: "get/answer",
        reqBody: { answerId: req.params.answerId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answers", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers");
    var reqMsg = {
        api: "get/answers",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answers/orderByViews", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByViews");
    var reqMsg = {
        api: "get/answers/orderByViews",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answers/orderByUpVotes", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByUpVotes");
    var reqMsg = {
        api: "get/answers/orderByUpVotes",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answers/orderByDownVotes", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByDownVotes");
    var reqMsg = {
        api: "get/answers/orderByDownVotes",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answers/byUserId/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/byUserId/:userId");
    var reqMsg = {
        api: "get/answers/byUserId/:userId",
        reqBody: {userId: req.params.userId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// get ans with comment list populate
AnswerRoutes.get("/answersWith/comments", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answersWith/comments");
    var reqMsg = {
        api: "get/answersWith/comments",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});
// Add Upvote to an answer
AnswerRoutes.put("/answer/upvoteInc/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/upvoteInc/:userId/:answerId");
    var reqMsg = {
        api: "put/answer/upvoteInc/:userId/:answerId",
        reqBody: {userId: req.params.userId, answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});
// Remove Upvote of answer
AnswerRoutes.put("/answer/upvoteDec/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/upvoteDec/:userId/:answerId");
    var reqMsg = {
        api: "put/answer/upvoteDec/:userId/:answerId",
        reqBody: {userId: req.params.userId, answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// Downvote an answer
AnswerRoutes.put("/answer/downvote/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/downvote/:userId/:answerId");
    var reqMsg = {
        api: "put/answer/downvote/:userId/:answerId",
        reqBody: {userId: req.params.userId, answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

// View an answer
AnswerRoutes.put("/answer/view/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/view/:answerId");
    var reqMsg = {
        api: "put/answer/view/:answerId",
        reqBody: {answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.put("/answer/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/:answerId");
    var reqMsg = {
        api: "put/answer/:answerId",
        reqBody: {answerId: req.params.answerId, body: req.body}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.delete("/answer/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete answer");
    var reqMsg = {
        api: "delete/answer/:answerId",
        reqBody: { answerId: req.params.answerId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

module.exports = AnswerRoutes;
