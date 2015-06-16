var glob = require("glob");
var fs = require("fs");
var uglifyjs = require("uglify-js");
var cleancss = require("clean-css");

// Compress JS files
glob("app/**/*.js", function (err, files) {
	if(err)
		return console.err(err);
	var miniJs = uglifyjs.minify(files);
	fs.writeFile("public/js/app.min.js",miniJs.code, function(err){
		if(err)
			return console.err(err);
		console.log("JS has been minified in public/js/app.min.js");
	});
});
glob("app/**/*.css", function (err, files) {
	if(err)
		return console.err(err);
	var miniCss = new cleancss().minify(files).styles;
	fs.writeFile("public/css/app.min.css",miniCss, function(err){
		if(err)
			return console.err(err);
		console.log("CSS has been minified in public/css/app.min.css");
	});
});