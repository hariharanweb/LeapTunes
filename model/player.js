var applescript = require("applescript");
var Q = require("Q");
var _ = require("underscore");

var nextTrackCommand = 'tell application "iTunes" \n next track \nend tell';
var previousTrackCommand = 'tell application "iTunes" \n previous track \nend tell';
var playPauseCommand = 'tell application "iTunes" \n playpause \nend tell';
var changeVolumeCommand = 'tell application "iTunes" \n set the sound volume to %d \nend tell';
var trackNameCommand = 'tell application "iTunes" \n get name of current track \nend tell';
var getVolumeCommand = 'tell application "iTunes" \n get sound volume \nend tell';

var trackListCommand =
  'tell application "iTunes" \n ' +
  'set myList to {} \n ' +
  'repeat with x in tracks of (view of front window) \n' +
    'set songItem to {{name of x, id of x}}\n' +
    'set myList to myList & songItem\n' +
    'end repeat\n' +
    'get myList\n' +
    'end tell';

exports.next = function () {
  return executeAppleScript(nextTrackCommand).then(getTrackName).then(function (trackName) {
    return {"trackName": trackName};
  });
};

exports.previous = function () {
  return executeAppleScript(previousTrackCommand).then(getTrackName).then(function (trackName) {
    return {"trackName": trackName};
  });
};

exports.playPause = function () {
  return executeAppleScript(playPauseCommand).then(getTrackName).then(function (trackName) {
    return {"trackName": trackName};
  });
};

exports.changeVolume = function (level) {
  var command = changeVolumeCommand.replace("%d", level);
  return executeAppleScript(command);
};

exports.trackInfo = function () {
  return executeAppleScript(trackNameCommand).then(function (trackName) {
    return {"trackName": trackName};
  });
};

exports.volume = function () {
  return executeAppleScript(getVolumeCommand).then(function (volume) {
    return {"volume": volume};
  });
}

exports.trackList = function() {
  return executeAppleScript(trackListCommand).then(function (tracks) {
    var items = _.map(tracks, function (track) {
      return {"name":track[0], "id":track[1]};
    })
    return items;
  });
}

var getTrackName = function () {
  return executeAppleScript(trackNameCommand);
}

var executeAppleScript = function (command) {
  var defer = Q.defer();
  applescript.execString(command, function (err, rtn) {
    if (err)
      console.log(err);
    defer.resolve(rtn);
  });
  return defer.promise;
}