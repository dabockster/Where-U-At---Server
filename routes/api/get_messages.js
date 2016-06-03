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

/* GET ___.com/api/get_messages */
router.get('/', function(req, res, next){
	// JSON fields
  var receiver = req.query.username;

	// Assemble SQL query
  var sql = "SELECT * FROM pendingMessages WHERE receiver = " + connection.escape(receiver);

	// Execute query
	connection.query(sql, function(err, response){
		// Return false to front end on error or item not found
		if (err){
			res.json({
				success: false
			});
		}

		//Init message list
		var messages = [];

		// Add messages to array
		for(i=0; i<response.length; i++){
			// clean up each message
			var message = {
				id: 				response[i].id,
				sender: 		response[i].sender,
				text: 			response[i].text,
				isLocation: response[i].isLocation
			};

			// Add messages to list
			messages.push(message);
		}

		// Assemble response object
		var json_response = {};
    json_response[receiver] = messages;

		// Send messages
		res.json(json_response);
	});
});

/* POST ___.com/api/get_messages */
router.post(function(req, res, next){
	res.send("POST not supported for this route!");
});

module.exports = router;
