var applescript = require("applescript");


var nextTrackCommand = 'tell application "iTunes" \n next track \nend tell';
var previousTrackCommand = 'tell application "iTunes" \n previous track \nend tell';
var playPauseCommand = 'tell application "iTunes" \n playpause \nend tell';

exports.next = function(req,res){
  applescript.execString(nextTrackCommand, function(err, rtn){
    if(!err){
      res.send("Success next");
    }else{
      console.log(err);
      res.send("Next song failed");
    }
  });
}

exports.prev = function(req,res){
  applescript.execString(previousTrackCommand, function(err, rtn){
    if(!err){
      res.send("Success prev");
    }else{
      console.log(err);
      res.send("Next song failed");
    }
  });
}

exports.play = function(req,res){
  applescript.execString(playPauseCommand, function(err, rtn){
    if(!err){
      res.send("Success play");
    }else{
      console.log(err);
      res.send("Next song failed");
    }
  });
}

exports.changeVolume = function(req, res) {


    res.send("Volume set at "+req.query.level);
}


/*
var applescript = require("applescript");

// Very basic AppleScript command. Returns the song name of each
// currently selected track in iTunes as an 'Array' of 'String's.
var script = 'tell application "iTunes" to get name of selection';

applescript.execString(script, function(err, rtn) {
  if (err) {
    // Something went wrong!
  }
  if (Array.isArray(rtn)) {
    rtn.forEach(function(songName) {
      console.log(songName);
    });
  }
});*/
