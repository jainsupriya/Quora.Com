const express = require("express");
const TopicRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "topic";

// topic
// questionList[]

TopicRoutes.post("/topic", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Topic");
    var reqMsg = {
        api: "post/topic",
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

TopicRoutes.get("/topic/:topicId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/topic");
    var reqMsg = {
        api: "get/topic",
        reqBody: { topicId: req.params.topicId }
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

TopicRoutes.get("/topics", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/topics");
    var reqMsg = {
        api: "get/topics",
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

TopicRoutes.put("/topic", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/topic");
    var reqMsg = {
        api: "put/topic",
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

TopicRoutes.delete("/topic/:topicId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete topic");
    var reqMsg = {
        api: "delete/topic/:topicId",
        reqBody: { topicId: req.params.topicId }
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

module.exports = TopicRoutes;
