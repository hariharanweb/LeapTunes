exports.next = function(req,res){
    res.send("Success next");
}

exports.prev = function(req,res){
    res.send("Success prev");
}

exports.stop = function(req,res){
    res.send("Success stop");
}

exports.changeVolume = function(req, res) {
    res.send("Volume set at "+req.query.level);
}