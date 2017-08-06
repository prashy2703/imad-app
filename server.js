var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});


var fs = require('fs');
var http = require('http');

var server = http.createServer(function (req, res) {
	if (req.url === "/" || req.url === "/favicon.ico" || req.url === "/index.html") {
		fs.readFile("index.html", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				var page = data.toString();
				
				fs.readFile("main.html", function (err, data) {
					if (err) {
						console.log(err);
					}
					else {
						var content = data.toString();
						page = page.replace("[replace]", content);
						res.end(page);
					}
				});
			}
		});
	}
	else if (req.url === "/style.css") {
		fs.readFile("style.css", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				res.end(data);
			}
		});
	}
	else {
		var path = req.url;
		path = path.slice(1);
		path = path.toString();
		var fileName = path.toLowerCase() + ".html";

		fs.readFile("index.html", function (err, data) {
			if (err) {
				console.log(err);
			}
			else {
				var page = data.toString();
				
				fs.readFile(fileName, function (err, data) {
					if (err) {
						console.log(err);
					}
					else {
						var content = data.toString();
						page = page.replace("[replace]", content);
						res.end(page);
					}
				});
			}
		});
	}
});

server.listen(80);