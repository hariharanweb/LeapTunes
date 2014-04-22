var applescript = require("applescript");
var Q = require("Q");


var nextTrackCommand = 'tell application "iTunes" \n next track \nend tell';
var previousTrackCommand = 'tell application "iTunes" \n previous track \nend tell';
var playPauseCommand = 'tell application "iTunes" \n playpause \nend tell';
var changeVolumeCommand = 'tell application "iTunes" \n set the sound volume to %d \nend tell';
var trackNameCommand = 'tell application "iTunes" \n get name of current track \nend tell';


exports.next = function () {
  return executeAppleScript(nextTrackCommand).then(getTrackName).then(function(trackName){
    return {"trackName":trackName};
  });
};

exports.previous = function () {
  return executeAppleScript(previousTrackCommand).then(getTrackName).then(function(trackName){
    return {"trackName":trackName};
  });
};

exports.playPause = function () {
  return executeAppleScript(playPauseCommand).then(getTrackName).then(function(trackName){
    return {"trackName":trackName};
  });
};

exports.changeVolume = function (level) {
  var command = changeVolumeCommand.replace("%d", level);
  return executeAppleScript(command);
};

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