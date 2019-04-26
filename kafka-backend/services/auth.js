const jwt = require("jsonwebtoken");
const User = require("../models/user");
const mysql = require("mysql");
const pool = require("../config/mysqlConnection");
const bcrypt = require("bcryptjs");
let hashedPass = ""

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
        case "post/login":
            try {
                hashedPass = bcrypt.hashSync(msg.reqBody.password+"", 10);
            }
            catch(err) {
                console.log("error in bcrypt")
                myCallback(err, null, callback);
            }
            pool.getConnection(function(err, connection) {
                if (err) {
                console.error("error connecting: " + err.stack);
                myCallback(err.stack, null, callback);
                return;
                }
                let queryString = 
                `SELECT * FROM users WHERE email = ${mysql.escape(msg.reqBody.email)};`;
                console.log(queryString)
                connection.query(queryString, (err, rows, fields) => {
                    if (err || rows.length <= 0) {
                        console.log(err)
                        myCallback("row <= 0 \n OR \n"+err, null, callback);
                    }else{
                        let passMatch = false
                        try {
                            passMatch = bcrypt.compareSync(msg.reqBody.password+"", rows[0].password+"")
                        } catch (error) {
                            myCallback(error, null, callback);
                        }
                        if(passMatch){
                            findLoginUser(rows,callback)
                        }
                        // findNewUser(conn,rows,callback)
                    }
                })
                // console.log("connected as id " + connection.threadId);
            });
            break;
        case "post/user":
            try {
                hashedPass = bcrypt.hashSync(msg.reqBody.password+"", 10);
            }
            catch(err) {
                console.log("error in bcrypt")
                myCallback(err, null, callback);
            }
            pool.getConnection(function(err, connection) {
                if (err) {
                    console.error("error connecting: " + err.stack);
                    myCallback(err.stack, null, callback);
                    return;
                }
                let queryString = 
                // `INSERT INTO quora.users(username, fname, lname, mobile, dob, gender, email, password)
                `INSERT INTO quora.users(username, fname, lname, email, password)
                VALUES (
                    ${mysql.escape(msg.reqBody.username)},
                    ${mysql.escape(msg.reqBody.fname)},
                    ${mysql.escape(msg.reqBody.lname)},
                    ${mysql.escape(msg.reqBody.email)},
                    ${mysql.escape(hashedPass)}
                );`;
                // VALUES (
                //     ${mysql.escape(msg.reqBody.username)},
                //     ${mysql.escape(msg.reqBody.fname)},
                //     ${mysql.escape(msg.reqBody.lname)},
                //     ${mysql.escape(msg.reqBody.mobile)},
                //     ${mysql.escape(msg.reqBody.dob)},
                //     ${mysql.escape(msg.reqBody.gender)},
                //     ${mysql.escape(msg.reqBody.email)},
                //     ${mysql.escape(hashedPass)}
                // );`;
                console.log(queryString)
                connection.query(queryString, (err, rows, fields) => {
                    if (err) {
                        console.log(err)
                        myCallback(err, null, callback);
                    }else{
                        findNewUser(connection,rows,callback)
                    }
                })
                // console.log("connected as id " + connection.threadId);
            });
            break;
        default:
            myCallback("msg api missing", null, callback);
            break;
    }
}

findNewUser = (conn,rows,callback) => {
    let queryString = 
                `SELECT * FROM users WHERE id = ${mysql.escape(rows.insertId)};`;
                console.log(queryString)
                conn.query(queryString, (err, rows1, fields) => {
                    if (err) {
                        myCallback(err, null, callback);
                    }else{
                        console.log(rows1)
                        sendTokenCreateMongo(rows1,callback)
                    }
                })
}

findLoginUser = (rows,callback) => {
    User.find({sqlUserId: rows[0].id})
        .then((result, err) => {
            if (err) {
                myCallback(err, null, callback);
            } else {
                var payload = { id: rows[0].id, email: rows[0].email };
                var token = jwt.sign(payload, "secret_is_secret");
                let resData = {
                    // status: 200,
                    // msg: "Success",
                    sqlData: rows[0],
                    MongoData: result,
                    token: token
                };
                myCallback(null, resData, callback);
            }
        })
        .catch(err => {
            myCallback(err, null, callback);
        });
}

sendTokenCreateMongo = (rows,callback) => {
    User
        .create({
            sqlUserId: rows[0].id, 
            email: rows[0].email,
            fname: rows[0].fname,
            lname: rows[0].lname,
            username: rows[0].username,
            // mobile: rows[0].mobile,
            // dob: rows[0].dob,
            // gender: rows[0].gender
        })
        .then((result, err) => {
            if (err) {
                myCallback(err, null, callback);                
            } else {
                var payload = { id: rows[0].id, email: rows[0].email };
                var token = jwt.sign(payload, "secret_is_secret");
                let resData = {
                    // status: 200,
                    // msg: "Success",
                    sqlData: rows[0],
                    MongoData: result,
                    token: token
                };
                myCallback(null, resData, callback);
            }
        })
        .catch(err => {
            myCallback(err, null, callback);                            
        });
}
exports.handle_request = handle_request;
