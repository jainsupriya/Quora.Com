const CLOUD_URL = "http://52.9.137.32:5000";
const Local_URL = "http://localhost:5000";
const express = require("express");
const multer = require("multer");
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const filesRoutes = express.Router();
const dirTree = require("directory-tree");
const fs = require('fs')
const fsx = require('fs-extra')
var kafka = require("../kafka/client");
const TOPIC = "user";
const redis = require("redis");

// Create Redis Client
// let client = redis.createClient();
var client = redis.createClient(
  6379,
  "redisforquora.gtvq8d.0001.usw1.cache.amazonaws.com",
  {
    no_ready_check: true
  }
);

client.on("connect", function() {
    console.log("Connected to Redis...");
});

// multer with S3
aws.config.update({
    accessKeyId :'AKIAZC7CQASPUAANSB64',
    secretAccessKey : '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',
    region : 'us-west-1',
})
const s3 = new aws.S3({    
    sslEnabled: false,
});
var userFolder = '273quora';
// var userFolder = '273quora/ProfilePic/';
const storage = multerS3({
    s3: s3,
    acl: 'public-read',
    bucket: userFolder,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
        // console.log(req)
        console.log("+++++++++++++++++++++++++++++++++")
        console.log(req.body)
        console.log("+++++++++++++++++++++++++++++++++")
      cb(null, "ProfilePic/"+req.body.userId+file.originalname)
    //   cb(null, "ProfilePic/"+req.body.filename)
    //   cb(null, file.originalname)
    }
  })
  const profilePicUpload = multer({
        storage: storage
    }).single('file');


// multer without S3
// const storage = multer.diskStorage({
//     destination: './public/uploads/temp',
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//         // cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
//     }
// });
// const upload = multer({
//     storage: storage
// }).single('file');

filesRoutes.put("/file/updateProfileImg", (req, res) => {
    console.log(
        "===================================================================================================================================================="
    );
    console.log("/file/updateProfileImg");
    profilePicUpload(req,res, (err) => {
        console.log(req.body)
        console.log(req.file)
        if (err) {
            console.log(err);
            res.status(422).send(err);
        } else {
            console.log(req.file.location)
            
            // let sourceUrl =
            //     "../backend/public/uploads/temp/" + req.file.filename;
            // let destinationUrl =
            //     "../backend/public/uploads/profilePics/" + req.body.filename;
            // let dbUrl = CLOUD_URL+"/uploads/profilePics/" + req.body.filename;
            // fsx.move(sourceUrl, destinationUrl,{ overwrite: true }, function(err) {
            //     if (err) {
            //         console.log(err);
            //         fsx.remove(sourceUrl);
            //         res.status(422).send(err);
            //     } else {
            //         console.log("move success");
                    var reqMsg = {
                        api: "put/file/updateProfileImg",
                        reqBody: {
                            userId: req.body.userId,
                            imgUrl: req.file.location
                        }
                    };
                    kafka.make_request(TOPIC, reqMsg, function(err, results) {
                        res.status(results.status).send(results.data);
                        client.hset(
                            "get/user/",
                            req.params.userId,
                            JSON.stringify(results.data)
                        );
                    });
            //     }
            // });
        }
    })
});

// filesRoutes.put("/file/updateProfileImg", (req, res) => {
//     console.log(
//         "===================================================================================================================================================="
//     );
//     console.log("/file/updateProfileImg");
//     profilePicUpload(req,res, (err) => {
//         console.log(req.body)
//         console.log(req.file)
//         if (err) {
//             console.log(err);
//             res.status(422).send(err);
//         } else {
//             let sourceUrl =
//                 "../backend/public/uploads/temp/" + req.file.filename;
//             let destinationUrl =
//                 "../backend/public/uploads/profilePics/" + req.body.filename;
//             let dbUrl = CLOUD_URL+"/uploads/profilePics/" + req.body.filename;
//             fsx.move(sourceUrl, destinationUrl,{ overwrite: true }, function(err) {
//                 if (err) {
//                     console.log(err);
//                     fsx.remove(sourceUrl);
//                     res.status(422).send(err);
//                 } else {
//                     console.log("move success");
//                     var reqMsg = {
//                         api: "put/file/updateProfileImg",
//                         reqBody: {
//                             userId: req.body.userId,
//                             imgUrl: dbUrl
//                         }
//                     };
//                     kafka.make_request(TOPIC, reqMsg, function(err, results) {
//                         res.status(results.status).send(results.data);
//                     });
//                 }
//             });
//         }
//     })
// });

module.exports = filesRoutes;
