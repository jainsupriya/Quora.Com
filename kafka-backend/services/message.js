const Message = require("../models/message");

myCallback = (err, result, callback) => {
    if (err) {
        console.log("__________err_________________\n", err);
        callback(null, {
            status: 422,
            msg: "Fail",
            data: err
        });
    } else {
        console.log("__________result_________________\n", result);
        callback(null, {
            status: 200,
            msg: "Success",
            data: result
        });
    }
};

function handle_request(msg, callback) {
    switch (msg.api) {
        case "post/message":
            Message.create(msg.reqBody)
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/message":
            Message.find({ _id: msg.reqBody.messageId })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/messages":
            Message.find({})
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "get/messages/:u1/:u2":
            Message.find({
                $or: [
                    { sender: msg.reqBody.u1, receiver: msg.reqBody.u2 },
                    { sender: msg.reqBody.u2, receiver: msg.reqBody.u1 }
                ]
            })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "put/message/:messageId":
            Message.findOneAndUpdate(
                { _id: msg.reqBody.messageId },
                msg.reqBody.body,
                {new: true}
            )
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        case "delete/message/:messageId":
            Message.remove({ _id: msg.reqBody.messageId })
                .then((result, err) => {
                    if (err) {
                        myCallback(err, null, callback);
                    } else {
                        myCallback(null, result, callback);
                    }
                })
                .catch(err => {
                    myCallback(err, null, callback);
                });
            break;
        default:
            myCallback("msg api missing", null, callback);
            break;
    }
}

exports.handle_request = handle_request;
