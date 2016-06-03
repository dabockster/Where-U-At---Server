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

/* GET ___.com/api/get_friends_list */
router.get('/', function(req, res, next) {
  // JSON fields
  var owner = req.query.username;

  // Assemble SQL query
  var sql = "SELECT * FROM friendsList WHERE owner = " + connection.escape(owner);

  // Execute the query
  connection.query(sql, function(err, response){
		// Return false to front end if error or item not found
		if (err){
      res.json({
        success: false
      });
    }

    // Init friends list
    var friends = [];

    // Add friends to array
    for (i = 0; i < response.length; i++){
      friends.push(response[i].friend);
    }

    // Assemble response object
    var json_response = {};
    json_response[owner] = friends;

    // Send friends list
    res.json(json_response);
  });
});

/* POST ___.com/api/get_friends_list */
router.post('/', function(req, res, next){
  res.send("POST NOT IMPLEMENTED FOR THIS FUNCTION!");
});

module.exports = router;
