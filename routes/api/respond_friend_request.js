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

/* GET ___.com/api/respond_friend_request */
router.get('/', function(req, res, next) {
  res.send('GET not supported on this route!');
});

/* POST ___.com/api/respond_friend_request */
router.post('/', function(req, res, next){
	//JSON fields
	var toUser 		   = req.body.toUser,
			fromUser	   = req.body.fromUser,
      acceptStatus = req.body.acceptStatus;

	//Do stuff if request is accepted
	if(acceptStatus){
		//assemble friend objects
		var friend1 = {
			owner: toUser,
			friend: fromUser
		};

		var friend2 = {
			owner: fromUser,
			friend: toUser
		};

		//attempt to insert friend1 into db
		connection.query('insert into friendsList set ?', friend1, function(err, result){
			// return false to front end on error or duplicate entry
			if(err){
				res.json({
					success: false
				});
			}
		});

		//attempt to insert friend2 into db
		connection.query('insert into friendsList set ?', friend2, function(err, result){
			// return false to front end on error or duplicate entry
			if(err){
				res.json({
					success: false
				});
			}
		});

		//assemble sql statement to delete the redundant request
		var sql = 'DELETE FROM pendingFriendRequest WHERE toUser = ' + connection.escape(toUser) + ' and fromUser = ' + connection.escape(fromUser);

		console.log(sql);

		//delete the redundant request
		connection.query(sql, function(err, result){
			// return false to front end on error or item not found
			if(err){
				res.json({
					success: false
				});
			}
		});

		//return true on successful insert
		res.json({
			success: true,
			status: 'accepted'
		});
	}
	//if accepted is false, delete the request
	else{
		//assemble sql statement
		var sql = 'DELETE FROM pendingFriendRequest WHERE toUser = ' + connection.escape(toUser) + ' and fromUser = ' + connection.escape(fromUser);

		// query database
		connection.query(sql, function(err, result){
			// return false to front end on error or item not found
			if(err){
				res.json({
					success: false
				});
			}
		});

		//return true on rejected friend request
		res.json({
			success: true,
			status: 'rejected'
		});
	}
});

module.exports = router;
