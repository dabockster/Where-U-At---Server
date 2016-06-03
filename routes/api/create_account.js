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

/* GET ___.com/api/create_account */
router.get('/', function(req, res, next){
	res.send("Hello");
});

/* POST ___.com/api/create_account */
router.post('/', function(req, res, next) {
	//get username and password
	var user = {
		username: req.body.username,
		password: req.body.password
	};

	//attempt to insert into db
	connection.query('insert into users set ?', user, function(err, result){
		// return false to front end on error or duplicate entry
		if(err){
			res.json({
				success: false
			});
		}
		// otherwise return true to front end
		else{
			res.json({
				success: true
			});
		}
	});
});

module.exports = router;
