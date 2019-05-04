const mysql = require("mysql");
var db = {};
db.pool = mysql.createPool({
  connectionLimit: "100",
  port: "3306",
  host: "quora.cmgpt7pa9mg7.us-west-1.rds.amazonaws.com",
  user: "quora",
  password: "quora123",
  database: "quora"
});
var conn;
var pool = db.pool;
//Connecting to database
// pool.getConnection(function(err, connection) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   conn = connection;

//   console.log("connected as id " + connection.threadId);
// });


module.exports = pool;

// module.exports.db = db;
// const CONNECTION_LIMIT = 10000;
// const HOST = "quora.cmgpt7pa9mg7.us-west-1.rds.amazonaws.com";
// const USER = "quora";
// const PASSWORD = "quora123";
// const DATABASE = "quora";
// const PORT = "3306";

// var connection = mysql.createPool({
//   connectionLimit: CONNECTION_LIMIT,
//   host: HOST,
//   user: USER,
//   password: PASSWORD,
//   database: DATABASE,
//   port: PORT,
//   multipleStatements: true
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error('Database connection failed: ' + err.stack);
//     return;
//   }

//   console.log('Connected to database.');
// });


// module.exports = connection;