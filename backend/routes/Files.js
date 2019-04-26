const express = require("express");
const multer = require("multer");
const filesRoutes = express.Router();
const dirTree = require("directory-tree");
const fs = require('fs')
const fsx = require('fs-extra')
const storage = multer.diskStorage({
    destination: './public/uploads/temp',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
        // cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single('file');
const TOPIC = "user";


filesRoutes.put("/file/updateProfileImg", (req, res) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/file/updateProfileImg");
    upload(req,res, (err) => {
        console.log(req.body)
        console.log(req.file)
        if (err) {
            console.log(err);
            res.send({
                status: 500,
                msg: err,
                data: null
            });
        } else {
            let sourceUrl =
                "../Backend/public/uploads/temp/" + req.file.filename;
            let destinationUrl =
                "../Backend/public/uploads/profilePics/" + req.body.filename;
            let dbUrl = "http://localhost:5000/uploads/profilePics/" + req.body.filename;
            fsx.move(sourceUrl, destinationUrl,{ overwrite: true }, function(err) {
                if (err) {
                    console.log(err);
                    fsx.remove(sourceUrl);
                    res.send({
                        status: 422,
                        msg: "Fail",
                        data: err
                    });
                } else {
                    console.log("move success");
                    var reqMsg = {
                        api: "put/file/updateProfileImg",
                        reqBody: {
                            userId: req.body.userId,
                            imgUrl: dbUrl
                        }
                    };
                    kafka.make_request(TOPIC, reqMsg, function(err, results) {
                        res.send(results);
                    });
                }
            });
        }
    })
});

module.exports = filesRoutes;
