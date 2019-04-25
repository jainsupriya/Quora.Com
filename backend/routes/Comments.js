const express = require("express");
const CommentRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "comment";

// comment
// answerId
// commentOwner[]
// postedTime

CommentRoutes.post("/comment", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Comment");
    var reqMsg = {
        api: "post/comment",
        reqBody: req.body
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

CommentRoutes.get("/comment/:commentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("get/comment");
    var reqMsg = {
        api: "get/comment",
        reqBody: { commentId: req.params.commentId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

CommentRoutes.get("/comments", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("get/comments");
    var reqMsg = {
        api: "get/comments",
        reqBody: null
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

CommentRoutes.put("/comment/:commentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("put/comment");
    var reqMsg = {
        api: "put/comment/:commentId",
        reqBody: { commentId: req.params.commentId, body: req.body }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

CommentRoutes.delete("/comment/:commentId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete comment");
    var reqMsg = {
        api: "delete/comment/:commentId",
        reqBody: { commentId: req.params.commentId }
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

module.exports = CommentRoutes;
