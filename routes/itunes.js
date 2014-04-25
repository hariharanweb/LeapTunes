var player = require("../model/player.js");

exports.next = function (req, res) {
  player.next().then(function(trackInfo){
    res.send(trackInfo);
  });
}

exports.prev = function (req, res) {
  player.previous().then(function(trackInfo){
    res.send(trackInfo);
  });
}

exports.play = function (req, res) {
  player.playPause().then(function(trackInfo){
    res.send(trackInfo);
  });
}

exports.trackInfo = function (req, res) {
  player.trackInfo().then(function(trackInfo){
    res.send(trackInfo);
  });
}

exports.changeVolume = function (req, res) {
  player.changeVolume(req.query.level).then(function () {
    res.send("Volume set at " + req.query.level);
  });
}

exports.play = function (req, res) {
  player.playPause().then(function(trackInfo){
    res.send(trackInfo);
  });
}

exports.volume = function (req, res) {
  player.volume().then(function(volume){
    res.send(volume);
  });
}



