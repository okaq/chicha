/*
*  Tenkion NodeJS Web Server
*  Created By: aq@okaq.com
*  On: 04/05/2011
*  Running: nodejs v0.4.5
*/

var tenkion = {
	"init": function() {
		// modules
		this.http = require('http');
		this.fs = require('fs');
		this.url = require('url');
		
		// static_files
		var nile0 = new nile();
		this.nile1 = new nile();
		this.niles = [
			new nile(nile0.a[0], nile0.b[0], nile0.b[5]),
			new nile(nile0.a[1], nile0.b[0], nile0.b[3]),
			new nile(nile0.a[2], nile0.b[0], nile0.b[5]),
			new nile(nile0.a[3], nile0.b[0], nile0.b[3]),
			new nile(nile0.a[4], nile0.b[0], nile0.b[5]),
			new nile(nile0.a[5], nile0.b[0], nile0.b[5])
		];
		this.load();
		this.serve();
	},
	"load": function() {
		for (var i = 0; i < this.niles.length; i++) {
			// async readFile index closure out of sync
			/*
			this.fs.readFile(
				this.niles[i].url.slice(1),
				this.niles[i].enc,
				function(err, data) {
					if (err) {
						console.log("fs.readFile arror reading file: " + tenkion.niles[i].url + ". Error message: " + err);
						tenkion.niles[i].fd = "";
					}
					console.log("tenkion.niles[i]: " + tenkion.niles[i] + ". i:" + i);
					tenkion.niles[i].fd = data;
				}
			);
			*/
			this.niles[i].fd = this.fs.readFileSync(this.niles[i].url.slice(1), this.niles[i].enc);
		}
	},
	"serve": function() {
		this.server = 
		this.http.createServer(function(req, res) {
			var i0;
			if (req.url == "/") {
				i0 = 1;
			} else if (req.url == "/speed") {
				i0 = 3;				
			} else {
				i0 = tenkion.nile1.a.indexOf(req.url);
			}	
			if (i0 != undefined && i0 != -1) {
				res.writeHead(200, tenkion.niles[i0].hdr);
				res.end(tenkion.niles[i0].fd);
			} else {
				res.writeHead(200, tenkion.niles[0].b[2]);
				res.end("The app you requested: " + req.url + " does not exist.\n" + (new Date().toUTCString()));
			}
		});	
			console.log("okaq.com web server (tenkion) started. Listening on port 8000...");
		
		this.server.listen(8000, "127.0.0.1");
	}
}

function nile(u0, e0, h0) {
	this.enc = e0;
	this.url = u0;
	this.fd = undefined;
	this.hdr = {'Content-Type':h0};
}

nile.prototype.b = [
	"utf-8",
	"gzip",
	"text/plain",
	"text/html",
	"text/css",
	"text/javascript"
];

nile.prototype.a = [
	"/ab/okaq.js",
	"/ab/okaq.html",
	"/ab/motd.js",
	"/ab/speed.html",
	"/ab/speed.js",
	"/ab/leek.js"
]; // nextus: use fs.readdir()

tenkion.init();
