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

/* GET ___.com/api/get_pending_requests */
router.get('/', function(req, res, next){
	// JSON fields
  var toUser = req.query.username;

  // Assemble SQL query
  var sql = "SELECT * FROM pendingFriendRequest WHERE toUser = " + connection.escape(toUser);

  // Execute the query
  connection.query(sql, function(err, response){
    if (err){
      res.json({
        success: false
      });
    }

    // Init friends list
    var possible_friends = [];

    // Add friends to array
    for (i = 0; i < response.length; i++){
      possible_friends.push(response[i].fromUser);
    }

    // Assemble response object
    var json_response = {};
    json_response[toUser] = possible_friends;

    // Send friends list
    res.json(json_response);
  });
});

/* POST ___.com/api/get_pending_requests */
router.post('/', function(req, res, next){
	res.send("POST not supported for this route!");
});

module.exports = router;
