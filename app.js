
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , tweets = require('./routes/tweets')
  , http = require('http')
  , path = require('path')
  , mongoose = require("mongoose");

var app = express();
mongoose.connect(process.env.MONGOLAB_URI || 'localhost/crappytwitter');

app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', tweets.main);
app.post('/tweets/:user', tweets.refresh);
app.get('/users', user.list);
app.get('/users/new', user.new);
app.post('/users/new', user.login);
app.get('/delete', tweets.delete);
app.get('/tweets/update', tweets.update);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
