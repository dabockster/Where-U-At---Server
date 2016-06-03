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

/* GET ___.com/api/delete_messages */
router.get('/', function(req, res, next) {
  res.send('Delete messages');
});

/* POST ___.com/api/delete_messages */
router.post('/', function(req, res, next){
	// JSON variables
	var stringOfIds = req.body.messageIDs;

	// Rip out the IDs of the messages to be deleted
	var ids = stringOfIds.split(",");

	// Kill messages to death
	for(i=0; i<ids.length; i++){
		// Set up DB command
		var sql = "DELETE FROM pendingMessages WHERE id = " + connection.escape(ids[i]);

		// Execute DB command
		connection.query(sql, function(err, response){
			// Return false to front end on error or if the current item is not found
			if(err){
				res.json({
					success: false
				});
			}
		});
	}

	// Send success when messages are killed to death
	res.json({
		success: true
	});
});

module.exports = router;
