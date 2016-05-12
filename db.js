var mysql        = require('mysql');

var con = mysql.createConnection({
  host: "pellada.ccbg9zlcxls5.us-west-2.rds.amazonaws.com",
  port: '3306',
  user: "pellada",
  password: "pellada10",
  database: "pellada"
});

con.connect(function(err){
  if(err){
    console.log('Error connecting to Db' + err.stack);
    return;
  }
  console.log('Connection established');
  connectionOk = true;

});


// con.end(function(err) {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

// con.query('SELECT * FROM parking_lot',function(err,rows){
//   if(err) throw err;
//
//   console.log('Data received from Db:\n');
//   console.log(rows);
// });

module.exports = con;
