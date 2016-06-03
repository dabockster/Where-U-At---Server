var express         = require('express'),
    httpserver      = require('http'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    websocket       = require('websocket').server;

//define filesystem locations
var index  = require('./routes/index'),
    api    = require('./routes/api');

//init express
var app = express();

//setup handlebars view engine
var handlebars = require('express-handlebars').create({
    defaultLayout : 'main'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//checks PORT environment variable before setting to 3000
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Enable routes
app.use('/', index);
app.use('/api', api);

// Enable websocket server
var server = httpserver.createServer(function(request, response){
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});
server.listen(3001, function(){
  console.log('Websocket listening on port 3001...');
});

// Setup websocket
wsServer = new websocket({
  httpServer: server,
  autoAcceptConnections: true
});

// allow websocket origin connections
function originIsAllowed(origin){
    return true;
}



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


//start the server if executed as a single process
app.listen(app.get('port'), function(){
    console.log("Express listening on port " + app.get('port') + "...");
});
