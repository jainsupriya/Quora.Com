const mongoose = require("mongoose");

// const neveruse = "mongodb://parthuest:Pass1234@cmpe273-shard-00-00-cvneo.mongodb.net:27017,cmpe273-shard-00-01-cvneo.mongodb.net:27017,cmpe273-shard-00-02-cvneo.mongodb.net:27017/CMPE273?ssl=true&replicaSet=CMPE273-shard-0&authSource=admin&retryWrites=true"
const dbUrl = "mongodb://parthuest:Pass1234@cmpe273-shard-00-00-cvneo.mongodb.net:27017,cmpe273-shard-00-01-cvneo.mongodb.net:27017,cmpe273-shard-00-02-cvneo.mongodb.net:27017/quora?ssl=true&replicaSet=CMPE273-shard-0&authSource=admin&retryWrites=true"
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(dbUrl, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("mongo db connected")
    }
})

// const dbUrl1 = "mongodb://@ec2-54-183-41-195.us-west-1.compute.amazonaws.com:27017/quora"
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.connect(dbUrl1, { mongos: true }, (err) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log("mongo db connected")
//     }
// })
mongoose.Promise = global.Promise