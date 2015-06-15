var express = require("express");
var app = express();

var portNum = process.argv[2] || "8080";

// Loading the API routes
var users = require("./routes/users");
var games = require("./routes/games");

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
	res.sendFile(__dirname+"/public/index.html");
});

app.listen(portNum);
console.log("App listening on port "+portNum+" from "+__dirname);