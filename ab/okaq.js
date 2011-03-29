var g = {
	"init": function() {
		// canvas
		this.doc = document;
		this.delta = this.doc.getElementById('delta');
		this.epsilon = this.doc.getElementById('epsilon');
		this.con = this.epsilon.getContext('2d');

		// init 
		this.init_size();
		this.tick_size();
		// this.resize(null);
		this.init_mouse();

		// dynamic scripts
		d.init();
	},
	"init_size": function() {
		// fixed block size
		this.bX = 40;
		this.bY = 40;
		// variable block count
		this.nX = (this.epsilon.width / this.bX) >>> 0;
		this.nY = (this.epsilon.height / this.bY) >>> 0;
		// margin factor
		this.fX = 1;
		this.fY = 1;
		this.nX -= 2 * this.fX;
		this.nY -= 2 * this.fY;
	},
	"resize": function(evt) {
		g.tick_size();
	},
	"tick_size": function() {
		this.nX = (window.innerWidth / this.bX) >>> 0;
		this.nY = (window.innerHeight / this.bY) >>> 0;
		this.nX -= 2 * this.fX;
		this.nY -= 2 * this.fY;
		// this.epsilon.width = 80; // (this.nX * this.bX) >>> 0;
		// this.epsilon.height = 80; // (this.nY * this.bY) >>> 0;
		this.cX = (this.nX * this.bX) >>> 0;
		this.cY = (this.nY * this.bY) >>> 0;
		// n.b. Chrome does not allow canvas.width to be set directly (set via css)
		// console.log("epsilon.width: " + this.epsilon.width + " epsilon.height: " + this.epsilon.height);
		this.epsilon.style.setProperty("width", this.cX.toString() + 'px', 'important');
		this.epsilon.style.setProperty("height", this.cY.toString() + 'px', 'important');
		this.delta.style.setProperty("width", this.cX.toString() + 'px', 'important');
		this.delta.style.setProperty("height", this.cY.toString() + 'px', 'important');
		this.con = this.epsilon.getContext('2d');
		// this.con.clearRect(0,0,this.epsilon.width,this.epsilon.height);
		l.loop();
	},
	"init_mouse": function() {
		this.epsilon.addEventListener('mousemove', g.move, false);
		this.epsilon.addEventListener("click", g.click, false);
	},
	"move": function(evt) {
		g.xm = evt.clientX - g.epsilon.offsetLeft;
		g.ym = evt.clientY - g.epsilon.offsetTop;
	},
	"click": function(evt) {
		return;
	},
	"draw": function() {
		// console.log("g.draw called.");
		// g.epsilon.width = g.epsilon.width;
		g.con.fillStyle = c.rgba(1.0);
		g.con.fillRect(0, 0, g.epsilon.width, g.epsilon.height);
		g.con.fillStyle = c.rgba(1.0);
		g.con.fillRect(g.xm-8, g.ym-8, 16, 16);
	}
}

var d = {
	"init": function() {
		this.head = document.getElementById('zeta');
		
		this.script = document.createElement('script');
		this.script.type = 'text/javascript';
		this.script.src = '/ab/motd.js';
		// onreadystatechange is not implemented on all browsers
		/*
		this.script.addEventListener('load', function(evt) {
			// if (this.readyState == "complete") {
				motd.init();
			// }
			console.log(this);
		});
		console.log(this.head);
		*/
		this.head.appendChild(this.script);
		this.script.onreadystatechange = this.handle;
		this.script.onload = this.handle;
	},
	"handle": function() {
		motd.init();
		console.log(this);
	}
}

var c = {
	"rgba": function(a) {
		var c0 = [this.r8(),
			this.r8(),
			this.r8(),
			a || Math.random()];
		
		return this.css(c0);
	},
	"r8": function() {
		return ((Math.random() * 255) >>> 0);
	},
	"css": function(c0) {
		return ('rgba(' + c0.join(',') + ')');
	},
	"hsla": function(a) {
		var c0 = [this.r8(),
			'100%',
			'50%',
			a];

		return('hsla(' + c0.join(',') + ')');	
	}
}

var l = {
	"load": function() {
		window.focus();
		g.init();
		l.loop();
	},
	"loop": function() {
		if (l.id) {
			window.clearInterval(l.id);
		}
		l.id = window.setInterval(g.draw, 100);
	},
	"pause": function() {
		if (l.id) {
			window.clearInterval(l.id);
			l.id = 'paused';
		}
	},
	"resume": function() {
		if (l.id == 'paused') {
			l.id = window.setInterval(g.draw, 100);
		}
	}
}

window.onload = l.load;
window.onresize = g.resize;
window.onblur = l.pause;
window.onfocus = l.resume;
