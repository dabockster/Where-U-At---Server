var express 								= require('express'),
		authenticate						= require('./api/authenticate'),
		create_account					= require('./api/create_account'),
		send_friend_request			= require('./api/send_friend_request'),
		respond_friend_request	= require('./api/respond_friend_request'),
		get_friends_list				= require('./api/get_friends_list'),
		get_messages						= require('./api/get_messages'),
		get_pending_requests		= require('./api/get_pending_requests'),
		send_message						= require('./api/send_message'),
		delete_messages					= require('./api/delete_messages');

/* enable router */
var router = express.Router();

/* GET ___.com/api */
router.get('/', function(req, res, next) {
  res.send('You\'ve hit the API!');
});

/* actual API routes */
router.use('/authenticate', authenticate);
router.use('/create_account', create_account);
router.use('/send_friend_request', send_friend_request);
router.use('/respond_friend_request', respond_friend_request);
router.use('/get_friends_list', get_friends_list);
router.use('/get_messages', get_messages);
router.use('/get_pending_requests', get_pending_requests);
router.use('/send_message', send_message);
router.use('/delete_messages', delete_messages);

module.exports = router;
