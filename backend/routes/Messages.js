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
        res.send(results);
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
        res.send(results);
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
        res.send(results);
    });
});

MessageRoutes.get("/messages/:u1/:u2", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/get/messages/:u1/:u2");
    var reqMsg = {
        api: "get/messages/:u1/:u2",
        reqBody: {u1: req.params.u1, u2:req.params.u2}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
    });
});

MessageRoutes.put("/message/:messageId", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/message/:messageId");
    var reqMsg = {
        api: "put/message/:messageId",
        reqBody: {messageId: req.params.messageId, body: req.body}
    };
    kafka.make_request(TOPIC, reqMsg, function(err, results) {
        res.send(results);
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
        res.send(results);
    });
});

module.exports = MessageRoutes;
