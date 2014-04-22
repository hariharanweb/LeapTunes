var applescript = require("applescript");
var Q = require("Q");

var nextTrackCommand = 'tell application "iTunes" \n next track \nend tell';
var previousTrackCommand = 'tell application "iTunes" \n previous track \nend tell';
var playPauseCommand = 'tell application "iTunes" \n playpause \nend tell';
var changeVolumeCommand = 'tell application "iTunes" \n set the sound volume to %d \nend tell';
var trackNameCommand = 'tell application "iTunes" \n get name of current track \nend tell';

exports.next = function (req, res) {
  executeAppleScript(nextTrackCommand).then(getTrackName).then(function(trackName){
    res.send({"trackName":trackName});
  });
}

exports.prev = function (req, res) {
  executeAppleScript(previousTrackCommand).then(getTrackName).then(function(trackName){
    res.send({"trackName":trackName});
  });
}

exports.play = function (req, res) {
  executeAppleScript(playPauseCommand).then(getTrackName).then(function(trackName){
    res.send({"trackName":trackName});
  });
}

exports.changeVolume = function (req, res) {
  var command = changeVolumeCommand.replace("%d", req.query.level);
  executeAppleScript(command).then(function () {
    res.send("Volume set at " + req.query.level);
  });
}

var getTrackName = function () {
  return executeAppleScript(trackNameCommand);
}

var executeAppleScript = function(command) {
  var defer = Q.defer();
  applescript.execString(command, function (err, rtn) {
    if(err)
      console.log(err);
    defer.resolve(rtn);
  });
  return defer.promise;
}
