const express = require("express");
const AnswerRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "answer";

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '776224',
  key: '67f71ccfff5990b594ee',
  secret: 'ec808fa31e3693ea10c5',
  cluster: 'us3',
  encrypted: true
});

// answer
// answerOwner[]
// imageList[]
// isAnonymous
// upVotes
// downVotes
// commentList[]
// postedTime

AnswerRoutes.post("/answer", (req, res, next) => {
    
    if(req.body.answerowner === "5ccdd8dabdae7817b83431e"){
        pusher.trigger('quora', 'post-answer', {
            "message": req.body
          });
    }
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
    console.log("/get/answer/:answerId");
    var reqMsg = {
        api: "get/answer/:answerId",
        reqBody: { answerId: req.params.answerId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
    });
});

AnswerRoutes.get("/answerWithCommentList/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answerWithCommentList/:answerId");
    var reqMsg = {
        api: "get/answerWithCommentList/:answerId",
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

AnswerRoutes.get("/answers/orderByViews/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByViews/:userId");
    var reqMsg = {
        api: "get/answers/orderByViews/:userId",
        reqBody: { userId: req.params.userId }
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

AnswerRoutes.get("/answers/orderByUpVotes/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByUpVotes/:userId");
    var reqMsg = {
        api: "get/answers/orderByUpVotes/:userId",
        reqBody: { userId: req.params.userId }
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

AnswerRoutes.get("/answers/orderByDownVotes/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByDownVotes/:userId");
    var reqMsg = {
        api: "get/answers/orderByDownVotes/:userId",
        reqBody: { userId: req.params.userId }
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

AnswerRoutes.get("/answers/orderByBookmarks/:userId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/answers/orderByBookmarks/:userId");
    var reqMsg = {
        api: "get/answers/orderByBookmarks/:userId",
        reqBody: { userId: req.params.userId }
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
        client.hset(
            "get/user/",
            req.params.userId,
            JSON.stringify(results.data)
        );
    });
});

// Downvote an answer
AnswerRoutes.put("/answer/undoDownvote/:userId/:answerId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer/undoDownvote/:userId/:answerId");
    var reqMsg = {
        api: "put/answer/undoDownvote/:userId/:answerId",
        reqBody: {userId: req.params.userId, answerId: req.params.answerId}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.status(results.status).send(results.data);
        client.hset(
            "get/user/",
            req.params.userId,
            JSON.stringify(results.data)
        );
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
