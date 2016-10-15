var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	port = 6001;

app.use('/app', express.static(__dirname + '/app'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));


server.listen(port, function(){
	console.log('Listen on Port ' + port);
});