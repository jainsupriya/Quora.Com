const User = require("../models/user");

function handle_request(msg, callback) {
    switch (msg.api) {
        //    case "post/user":
        //             User
        //                 .create(msg.reqBody)
        //                 .then((result, err) => {
        //                     if (err) {
        //                         console.log("__________err_________________\n",err)
        //                         callback(err,err)
        //                     } else {
        //                         console.log("__________result_________________\n",result)
        //                         callback(null,result)
        //                     }
        //                 })
        //                 .catch(err => {
        //                     console.log("__________err_________________\n",err)
        //                     callback(err,err)
        //                 })
        //        break;
        case "get/user":
            User.find({ _id: msg.reqBody.userId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback(err, err);
                });
            break;
        case "get/users":
            User.find({})
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback(err, err);
                });
            break;
        case "put/user/:userId":
            User.findOneAndUpdate({ _id: msg.reqBody.userId }, msg.reqBody.body)
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
                    }
                })
                .catch(err => {
                    console.log("__________err_________________\n", err);
                    callback(err, err);
                });
            break;
        case "delete/user/:userId":
            User.remove({ _id: msg.reqBody.userId })
                .then((result, err) => {
                    if (err) {
                        console.log("__________err_________________\n", err);
                        callback(err, err);
                    } else {
                        console.log(
                            "__________result_________________\n",
                            result
                        );
                        callback(null, result);
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
