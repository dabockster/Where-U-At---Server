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

/* GET ___.com/api/send_friend_request */
router.get('/', function(req, res, next) {
  res.send('You\'re trying to add a friend!');
});

/* POST ___.com/api/send_friend_request */
router.post('/', function(req, res, next){
	//assemble friend request object
	var friendRequest = {
		toUser: 	req.body.toUser,
		fromUser:	req.body.fromUser
	};

	//check to see if they're already friends
	var exists_query_1 = "SELECT EXISTS (SELECT * FROM friendsList WHERE owner = " + connection.escape(friendRequest.toUser) + " AND friend = " + connection.escape(friendRequest.fromUser);

	var exists_query_2 = "SELECT EXISTS (SELECT * FROM friendsList WHERE owner = " + connection.escape(friendRequest.fromUser) + " AND friend = " + connection.escape(friendRequest.toUser);

	connection.query(exists_query_1, function(err, result){
		// return false to front end on error or item not found
		if(err){
			res.json({
				success: false
			});
		}
	});

	connection.query(exists_query_2, function(err, result){
		// return false to front end on error or item not found
		if(err){
			res.json({
				success: false
			});
		}
	});

	//attempt to insert into db
	connection.query('insert into pendingFriendRequest set ?', friendRequest, function(err, result){
		// return false to front end on error or duplicate entry
		if(err){
			res.json({
				success: false
			});
		}
		// otherwise return true if all other conditions have not returned false
		else{
			res.json({
				success: true
			});
		}
	});
});

module.exports = router;
