var glob = require("glob");
var fs = require("fs");
var mkdirp = require('mkdirp');
var uglifyjs = require("uglify-js");
var cleancss = require("clean-css");

// Turning HTML templates into functions
var tpl ="";
glob("client/tpl/*.html", function(err, files){
	if(err)
		return console.error(err);
	for (var i = 0; i < files.length; i++) {
		var fName = files[i].split("/")[2].split(".")[0];
		var f = "var tpl_"+fName+" = function(){ return '"
		var data = fs.readFileSync(files[i],"utf8");
		var fHtml = data.split(/\r\n|\r|\n/g); 
		for (var j = 0; j < fHtml.length; j++){
			var trimed = fHtml[j].replace(/(^\s+|\s+$)/g,'');
			trimed = trimed.replace(/'/g, "\\'");
			f+=trimed;
		}	
		f +="'};";
		tpl += f;
		console.log(files[i]+" has been transformed into a JS function")
	}
	console.log("All templates have been transformed into JS functions");
})

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
		// tpl are the functions made out of templates
		fs.writeFile("public/js/app.min.js",miniJs.code + tpl, function(err){
			if(err)
				return console.error(err);
			console.log("All client-side JS files have been minified in public/js/app.min.js");
		});
		});
	}
});

// Compress CSS files
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
				console.log("All CSS files have been minified in public/css/app.min.css");
			});
		});
	}
});