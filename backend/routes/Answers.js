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

AnswerRoutes.put("/answer", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/put/answer");
    var reqMsg = {
        api: "put/answer",
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

module.exports = AnswerRoutes;
