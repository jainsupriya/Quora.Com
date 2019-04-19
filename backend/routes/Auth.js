const express = require("express");
const authRouter = express.Router();
var kafka = require("../kafka/client");
const TOPIC = "auth";

authRouter.post("/login", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/login");
    var reqMsg = {
        api: "post/login",
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
            res.send(results);
        }
    });
});

authRouter.post("/user", (req, res, next) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/postUsers");
    var reqMsg = {
        api: "post/user",
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
            res.send(results);
        }
    });
});

module.exports = authRouter;
