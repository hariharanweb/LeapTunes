var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var player = require('./routes/player');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);


app.get('/player/playlist/next', player.next);
app.get('/player/playlist/play', player.play);
app.get('/player/playlist/prev', player.prev);

app.get('/player/volume', player.changeVolume);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
