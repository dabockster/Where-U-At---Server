var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'zoe.cs.plu.edu',
  user: 'swift',
  password: 'swift',
  database: 'Firebase499'
});
connection.connect();


var user = {
  username: 'caleb',
  password: 'caleb'
};

var query = connection.query('insert into users set ?', user, function (err, result) {
  if (err) {
    console.error(err);
    return;
  }
  console.error(result);
});
