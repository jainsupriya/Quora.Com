const jwt = require("jsonwebtoken");
const User = require("../models/user");

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/login":
            User.authenticate(msg.reqBody.email, msg.reqBody.password, function(
                error,
                user
            ) {
                if (error || !user) {
                    console.log("__________err_________________\n", error);
                    callback(err, error);
                } else {
                    console.log("user found");
                    console.log("__________result_________________\n", user);
                    var payload = { id: user._id };
                    var token = jwt.sign(payload, "secret_is_secret");
                    let resData = {
                        status: 200,
                        msg: "Success",
                        data: user,
                        token: token
                    };
                    callback(null, resData);
                }
            });
            break;
        case "post/user":
            User.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        var payload = { id: result._id };
                        var token = jwt.sign(payload, "secret_is_secret");
                        let resData = {
                            status: 200,
                            msg: "Success",
                            data: result,
                            token: token
                        };
                        callback(null, resData);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback(err, err);
                });
            break;
        default:
            callback(err, "msg api missing");
            break;
    }
}

exports.handle_request = handle_request;
