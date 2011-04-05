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
		this.niles = [
			new nile(nile.a[0], nile.b[0], nile.b[5]),
			new nile(nile.a[1], nile.b[0], nile.b[3]),
			new nile(nile.a[2], nile.b[0], nile.b[5]),
			new nile(nile.a[3], nile.b[0], nile.b[3]),
			new nile(nile.a[4], nile.b[0], nile.b[5]),
			new nile(nile.a[5], nile.b[0], nile.b[5])
		];
		this.load();
	},
	"load": function() {
		for (var i = 0; i < this.niles.length; i++) {
			this.fs.readFile(
				this.niles[i].url.slice(1),
				this.niles[i].enc,
				function(err, data) {
					if (err) {
						console.log("fs.readFile arror reading file: " + this.niles[i].url + ". Error message: " + err);
						this.niles[i].fd = "";
					}
					this.niles[i].fd = data;
				}
			);	
		}
	}
}

function nile(u0, e0, h0) {
	this.enc = e0;
	this.url = u0;
	this.fd = undefined;
	this.hdr = h0;
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


