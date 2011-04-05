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
	}
}

function nile(e0, u0, h0) {
	this.enc = e0;
	this.url = u0;
	this.fd = undefined;
	this.header = h0;
}

nile.prototype.a = [
	"utf-8",
	"gzip",
	"text/plain",
	"text/html",
	"text/css",
	"text/javascript"
];

nile.prototype.b = [
	"/ab/okaq.js",
	"/ab/okaq.html",
	"/ab/motd.js",
	"/ab/speed.html",
	"/ab/speed.js",
	"/ab/leek.js"
];


