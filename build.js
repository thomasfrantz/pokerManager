var glob = require("glob");
var fs = require("fs");
var mkdirp = require('mkdirp');
var uglifyjs = require("uglify-js");
var cleancss = require("clean-css");

// Compress JS files
mkdirp('public/js/', function (err) {
    if (err) 
		return console.error(err)
    else {
		console.log('Directory /public/js/ has been created');
		glob("client/**/*.js", function (err, files) {
		if(err)
			return console.error(err);
		var miniJs = uglifyjs.minify(files);
		fs.writeFile("public/js/app.min.js",miniJs.code, function(err){
			if(err)
				return console.error(err);
			console.log("JS has been minified in public/js/app.min.js");
		});
		});
	}
});

mkdirp('public/css/', function (err) {
    if (err) 
		return console.error(err)
    else {
		console.log('Directory /public/css/ has been created');
		glob("client/**/*.css", function (err, files) {
			if(err)
				return console.error(err);
			var miniCss = new cleancss().minify(files).styles;
			fs.writeFile("public/css/app.min.css",miniCss, function(err){
				if(err)
					return console.error(err);
				console.log("CSS has been minified in public/css/app.min.css");
			});
		});
	}
});