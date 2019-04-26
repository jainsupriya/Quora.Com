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
        console.log(err)
        console.log(results)
        if (err) {
            console.log("in err")
            console.log(err);
            console.log({
                status: 422,
                msg: "Fail",
                data: err
            })
            res.status(422).send(err);
        } else {
            console.log("in else")
            console.log(results);
            res.status(results.status).send(results.data);
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
            res.status(422).send(err);
        } else {
            console.log(results);
            res.status(results.status).send(results.data);
        }
    });
});

module.exports = authRouter;
