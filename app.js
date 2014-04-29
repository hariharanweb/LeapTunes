var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var itunes = require('./routes/itunes');

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


app.get('/player/playlist/next', itunes.next);
app.get('/player/playlist/play', itunes.play);
app.get('/player/playlist/prev', itunes.prev);
app.get('/player/playlist/trackInfo', itunes.trackInfo);
app.get('/player/playlist/tracks', itunes.tracks);

app.get('/player/setVolume', itunes.changeVolume);
app.get('/player/volume', itunes.volume);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
