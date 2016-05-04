/*global console*/
var //yetify = require('yetify'),
    config = require('getconfig'),
	express = require('express'),
    fs = require('fs'),
	logger = require('morgan'),
    sockets = require('./sockets'),
	app = express(),
    port = parseInt(process.env.PORT || config.server.port, 10),
    server = app.listen(port);
/*
// Create an http(s) server instance to that socket.io can listen to
if (config.server.secure) {
    server = require('https').Server({
        key: fs.readFileSync(config.server.key),
        cert: fs.readFileSync(config.server.cert),
        passphrase: config.server.password
    }, server_handler);
} else {
    server = require('http').Server(server_handler);
}
server.listen(port);
*/
// log requests.
app.use(logger('dev'));
// Static resource.
app.use(express.static(__dirname + '/public'));

// index.html
app.get('/', function(req, res){
  res.sendfile('room.html');
});
sockets(server, config);

if (config.uid) process.setuid(config.uid);

var httpUrl;
if (config.server.secure) {
    httpUrl = "https://localhost:" + port;
} else {
    httpUrl = "http://localhost:" + port;
}
console.log('Class Room Signal Server is running at: ' + httpUrl);
