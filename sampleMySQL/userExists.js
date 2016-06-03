var mysql = require('mysql');

//create the conection to the database
var connection = mysql.createConnection({
  host: 'zoe.cs.plu.edu',
  user: 'swift',
  password: 'swift',
  database: 'Firebase499'
});
connection.connect(); //connect to the database

var enteredName = 'jeoff' //name that was passed in

//? is the variable being passed in
var query = connection.query('select users.username from users where username = ?;', enteredName, function(err, result) {
  if(result.length == 0){
    console.log("user does not exists");
  }
  else{
    console.log(result);
  }
});
