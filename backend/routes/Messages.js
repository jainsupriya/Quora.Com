const express = require("express");
const MessageRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "message";

// sender
// receiver
// msgBody
// timeStamp

MessageRoutes.post("/message", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/post Message");
    var reqMsg = {
        api: "post/message",
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

MessageRoutes.get("/message/:messageId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/message");
    var reqMsg = {
        api: "get/message",
        reqBody: { messageId: req.params.messageId }
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

MessageRoutes.get("/messages", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/messages");
    var reqMsg = {
        api: "get/messages",
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

MessageRoutes.put("/message", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/message");
    var reqMsg = {
        api: "put/message",
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

MessageRoutes.delete("/message/:messageId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/delete message");
    var reqMsg = {
        api: "delete/message/:messageId",
        reqBody: { messageId: req.params.messageId }
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

module.exports = MessageRoutes;
