const express = require("express");
const ContentRoutes = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "content";

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
