var express = require("express");
var router = express.Router();

router.route("/")
	.post(function(req, res){
		res.end("POST new User");
	})
	.get(function (req, res){
		res.end("GET all Users");
	});

router.route("/:id")
	.get(function(req, res){
		res.end("GET "+req.params.id);
	})
	.put(function(req, res){
		res.end("PUT "+req.params.id);
	})
	.delete(function(req, res){
		res.end("DELETE "+req.params.id);
	});
	
router.all("/*", function(req, res){
	res.status(400).json({error:"Api Users doesn't work like that"});
})
	
module.exports = router;