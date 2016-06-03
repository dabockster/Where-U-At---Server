var express 	= require('express'),
		config 		= require('../../config.js'),
		mysql			= require('mysql'),
		jwt				= require('jsonwebtoken');

/* enable router */
var router = express.Router();

/* init database connection */
var connection = mysql.createConnection({
  host: config.db.url,
  user: config.db.username,
  password: config.db.password,
  database: config.db.database
});
connection.connect();

/* GET ___.com/api/authenticate */
router.get('/', function(req, res, next) {
  res.send('You\'ve hit the authenticator!');
});

//set success flag
var account_found = false;

/* POST ___.com/api/authenticate */
router.post('/', function(req, res, next){
	//get username and password
	var username = req.body.username,
			password = req.body.password;

	//assemble SQL qeury
	var sql = "SELECT * FROM users WHERE username = " + connection.escape(username) + " AND password = " + connection.escape(password);

	//search the database for the username
	connection.query(sql, function(err, result){
		//return false if not detected
		if (err || result.length == 0){
			res.json({
				success: false
			});
		}
		//return true if detected
		else{
			res.json({
				success: true
			});
		}
	});
});

module.exports = router;
