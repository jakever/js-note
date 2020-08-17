var fs = require('fs');

fs.readdir(__dirname, function(err, files){
	console.log(err);
	console.log(files);
});