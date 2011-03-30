/* 
*  Roaku nodeJS Web Sever 
*  Created by: aq@okaq.com
*  On: 03/29/2011
*  Target: node.js v0.4.4
*/

var roaku = {
	"init": function() {
		// greet
		this.now = new Date(); // Date.now();
		this.motd("our greens will bloom like spring");
		
		// init
		this.modules();
		this.static();

		// serve
		this.create();
	},
	"motd": function(m) {
		console.log("Roaku Web Server started.");
		console.log("Time: " + this.now.toUTCString());
		console.log("Platform: " + process.platform);
		console.log("Node: " + process.execPath);
		console.log("Version: " + process.version);
		console.log("Server: " + __filename);
		if (m) {
			console.log(m);
		}
	},
	"modules": function() {
		this.http = require('http');
		this.os = require('os');
		this.fs = require('fs');
		this.url = require('url');
		this.child_process = require('child_process');
		this.spawn = this.child_process.spawn;
	},
	"static": function() {
		this.files = [
			new this.rest(),
			new this.rest(),
			new this.rest(),
			new this.rest(),
			new this.rest()
		];

		this.files[0].url = 'ab/okaq.html';
		this.files[0].encoding = 'utf-8';
		this.files[0].header = this.files[0].headers[1];
		// this.files[0].load();
		roaku.fs.readFile(this.files[0].url, this.files[0].encoding, function(err, data) {
			if (err) throw err;
			roaku.files[0].fd = data;
		});

		this.files[1].url = 'ab/okaq.js';
		this.files[1].encoding = 'utf-8';
		this.files[1].header = this.files[0].headers[2];
		roaku.fs.readFile(this.files[1].url, this.files[1].encoding, function(err, data) {
			if (err) throw err;
			roaku.files[1].fd = data;
		});

		this.files[2].url = 'ab/motd.js';
		this.files[2].encoding = 'utf-8';
		this.files[2].header = this.files[0].headers[2];
		roaku.fs.readFile(this.files[2].url, this.files[2].encoding, function(err, data) {
			if (err) throw err;
			roaku.files[2].fd = data;
		});

		this.files[3].url = 'ab/speed.html';
		this.files[3].encoding = 'utf-8';
		this.files[3].header = this.files[0].headers[1];
		roaku.fs.readFile(this.files[3].url, this.files[3].encoding, function(err, data) {
			if (err) throw err;
			roaku.files[3].fd = data;
		});

		this.files[4].url = 'ab/speed.js';
		this.files[4].encoding = 'utf-8';
		this.files[4].header = this.files[0].headers[2];
		roaku.fs.readFile(this.files[4].url, this.files[4].encoding, function(err, data) {
			if (err) throw err;
			roaku.files[4].fd = data;
		});
	},
	"rest": function() {
		this.url = '';
		this.fd = undefined;
		this.encoding = '';
		this.header = {};
		/* fs.readFile callback executes in 'global' context
		this.load = function() {
			console.log("Loading static file: " + this.url);
			pikru.fs.readFile(this.url, this.encoding, 
				this.set_fd());
		};
		this.set_fd = function() {
			// if (err) throw err;
			// pikru.files[0].fd = data;
			// console.log("Loaded. " + this);
			return function(err, data) {
				if (err) throw err;
				this.fd = data;
			};
		};
		*/
		this.headers = [
			{'Content-Type':'text/plain'},
			{'Content-Type':'text/html'},
			{'Content-Type':'text/javascript'},
			{'Content-Type':'text/css'}
		];
	},
	"create": function() {
		this.server = this.http.createServer(function(req, res) {
			var file;
			if (req.url == '/ab/okaq.js') {
				file = roaku.files[1];
			}
			if (req.url == '/ab/motd.js') {
				file = roaku.files[2];
			}
			if (req.url == '/') {
				file = roaku.files[0];
			}
			if (req.url == '/ab/speed.js') {
				file = roaku.files[4];
			}
			if (req.url == '/speed') {
				file = roaku.files[3];
			}
			if (file != undefined) {
				res.writeHead(200, file.header);
				res.end(file.fd);
				console.log("Serving: " + file.url);
			} else {
				res.writeHead(200, roaku.files[0].headers[0]);
				res.end("The web app you requested: " + req.url + " does not exist.\n" + (new Date()).toUTCString()); 
			}
		});
		this.server.listen(8000, "127.0.0.1");
		console.log("Server started. Listenting on: http://127.0.0.1:8000 "); 
	}
}

roaku.init();
