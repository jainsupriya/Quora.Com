const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const redis = require('redis');
// require('./config/db');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "*", credentials: true }));
// app.use(cors({ origin: "http://52.53.221.35:3000", credentials: true }));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.static('./public'))

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: true
        // extended: false
    })
);
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", "http://52.53.221.35:3000");
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

// Create Redis Client
// let client = redis.createClient();

// client.on('connect', function(){
//   console.log('Connected to Redis...');
// });

// include all routes
app.use(require("./routes/Answers"));
app.use(require("./routes/Auth"));
app.use(require("./routes/Comments"));
app.use(require("./routes/Messages"));
app.use(require("./routes/Questions"));
app.use(require("./routes/Topics"));
app.use(require("./routes/Users"));
app.use(require("./routes/Files"));
app.use(require("./routes/Content"));
app.use(require("./routes/Activity"));
// app.use(passport.authenticate('jwt', {session: false}), userRoutes);

// error handling middleware
app.use(function(err, req, res, next){
    console.log(err)
    let resData = {
        status: 422, 
        msg: err,
        data: null
    };
    res.status(422).send(resData);
})

module.exports = app;

//start your server on port 5000
app.listen(5000);
console.log("Server Listening on port 5000");
