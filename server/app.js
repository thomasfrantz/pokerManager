var express = require("express");
var app = express();

var portNum = process.argv[2] || "8080";

// Path to the application root
var path = require('path');
var appDir = path.normalize(__dirname+"/..");

// Loading the API routes
var users = require("./routes/users");
var games = require("./routes/games");

// If the port number is already used, we catch the error
process.on('uncaughtException',function(err){
	console.error("The port "+portNum+" is already being used !");
	return console.error(err);
});

// If a file path corresponds to a static resource, it's in /public
app.use(express.static('public'));

// If a file path corresponds to an API resource, it uses the API routes
app.use("/api/users", users);
app.use("/api/games", games);

// If a file path corresponds to a wrong API resource, it throws an error
app.all("/api/*", function(req, res){
	res.status(400).json({"error":"Api doesn't work like that"});
})

// If a file path doesn't corresponds to any of the above, it gives index.html
app.all("/*", function(req, res){
	res.sendFile(appDir+"/public/index.html");
});

app.listen(portNum, function(){
	console.log("Poker Manager is listening on port "+portNum+" from "+appDir);
});