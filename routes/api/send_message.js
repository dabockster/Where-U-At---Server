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

/* GET ___.com/api/send_message */
router.get('/', function(req, res, next){
	res.send("GET not supported on this route!");
});

/* POST ___.com/api/send_message */
router.post('/', function(req, res, next){
	// assemble message object
	var message = {
		sender: 			req.body.sender,
		receiver: 		req.body.receiver,
		text: 				req.body.message,
		isLocation: 	req.body.mLocation
	};

	// attempt to insert message into db
	connection.query('insert into pendingMessages set ?', message, function(err, result){
		// return false on error or duplicate message ID
		if(err){
			res.json({
				success: false
			});
		}
		// otherwise return true and send ID of inserted object to front end
		else{
			res.json({
				success: true,
				id: result.insertId
			});
		}
	});
});

module.exports = router;
