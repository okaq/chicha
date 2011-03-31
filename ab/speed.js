// okaq.com/speed - HTML5 Canvas Plasma Benchmark
// created by: aq@okaq.com
// on: 03/30/2011

var s = {
	"init": function() {
		this.can = document.getElementById('epsilon');
		this.con = this.can.getContext('2d');
		this.bkgd = c.rgba();
		this.run = false;

		this.init_mouse();
		this.clear();
		t.init();
	},
	"init_mouse": function() {
		this.can.addEventListener("click", s.click, false)
	},
	"click": function(evt) {
		if (this.run == true)
			return;
		this.run = true;	
		// start
		window.setTimeout(g.init, 30);
	},
	"clear": function(c0) {
		this.con.fillStyle = (c0 == undefined) ? this.bkgd : c0;
		this.con.fillRect(0, 0, this.can.width, this.can.height);
	},
	"draw": function() {
		s.d0 = s.con.createImageData(s.can.width, s.can.height);
		for (var i = 0; i < s.d0.data.length; i += 4) {
			var j = Math.floor(i / 4);
			
			if (d.pixels[j] == undefined) {
				continue;
			}
			
			var hc = d.pixels[j];
			if (hc < 0) {
				hc =  -1 * hc; // -hc + parseInt(hc);
			}
			if (hc >= 1) {
				hc = 2 - hc; // hc - Math.floor(hc);
			}
            var c0 = c.f2rgb(hc);
            var a0 = 255;
            
			s.d0.data[i] = c0[0];
            s.d0.data[i + 1] = c0[1];
            s.d0.data[i + 2] = c0[2];
            s.d0.data[i + 3] = a0;
        }
		s.clear('rgba(255,255,255,1.0)');
		s.con.putImageData(s.d0, 0, 0); // , 0, 0, s.can.width, s.can.height);
		// s.run = false;
		/* debug
		var r0 = (Math.random() * d.pixels.length) >>> 0;
		console.log("d.pixels[" + r0 + "] = " + d.pixels[r0]);
		console.log("s.d0.data[" + r0 + "] = " + s.d0.data[r0]);
		console.log("s.d0 type: " + typeof(s.d0) + " s.d0.data length = " + s.d0.data.length);
		console.log("c.f2rgb(" + d.pixels[r0] +") = " + c.f2rgb(d.pixels[r0]));
		*/
	}
}

var g = {
	"init": function() {
		g.t0 = (new Date()).getTime();
		m.init();
		s.draw();
		g.t1 = (new Date()).getTime();
		t.update(g.t1-g.t0);
	}
}

var m = {
	"init": function() {
		d.init();
		this.begin0 = 0;
		this.length0 = d.pixels.length;
		this.plasma(this.begin0, this.length0);
	},
	"plasma": function(begin, length) {
		// size check
		if (length < 16) {
			return;
		}
		
		d.set_sub(begin, length);
		
		// side length
		var s0 = Math.floor(Math.sqrt(length));
		var c0, c1, c2, c3;
		
		// set four corners of initial main array to random values (fast)
		// ordinal order is top,left,right,bottom
		if (d.pixels[0] == undefined) {
			c0 = Math.random();
			c1 = Math.random();
			c2 = Math.random();
			c3 = Math.random();
			
			d.set_xy(0, 0, c0);
			d.set_xy(s0-1, 0, c1); // zero-index
			d.set_xy(0, s0-1, c2);
			d.set_xy(s0-1, s0-1, c3);
		}
		
		// set 8 edge midpoints using linear interpolation
		// get 4 corner color values
		if (c0 == undefined) {
			c0 = d.get_c0();
			c1 = d.get_c1();
			c2 = d.get_c2();
			c3 = d.get_c3();
		}
		
		// interpolation factor
		var if0 = 0.0001;//  * s;
		var e0 = (c0 > c1) ? ((c0 + c1) / 2 + if0) : ((c0 + c1) / 2 - if0);
		var e1 = (c0 < c1) ? (c0 + c1) / 2 + if0 : (c0 + c1) / 2 - if0;
		var e2 = (c0 > c2) ? (c0 + c2) / 2 + if0 : (c0 + c2) / 2 - if0;
		var e3 = (c0 < c2) ? (c0 + c2) / 2 + if0 : (c0 + c2) / 2 - if0;
		var e4 = (c1 > c3) ? (c1 + c3) / 2 + if0 : (c1 + c3) / 2 - if0;
		var e5 = (c1 < c3) ? (c1 + c3) / 2 + if0 : (c1 + c3) / 2 - if0;
		var e6 = (c2 > c3) ? (c2 + c3) / 2 + if0 : (c2 + c3) / 2 - if0;
		var e7 = (c2 < c3) ? (c2 + c3) / 2 + if0 : (c2 + c3) / 2 - if0;
		
		d.set_e0(e0);
		d.set_e1(e1);
		d.set_e2(e2);
		d.set_e3(e3);
		d.set_e4(e4);
		d.set_e5(e5);
		d.set_e6(e6);
		d.set_e7(e7);
		
		// 4 center midpoint displacements
		var f0 = 1.5; // factor
		var r0 = s0 / d.width * f0;// * Math.random();
		var rd = (r0/2) - Math.random() * r0; // * (s / d.width); // 0.01
		// weightings
		var w0 = 0.255;
		var w1 = 0.25;
		var w2 = 0.25;
		var w3 = 0.245;
		var m0 = (w0 * c0) + (w1 * c1) + (w2 * c2) + (w3 * c3) + rd;
		var m1 = (w0 * c1) + (w1 * c0) + (w2 * c3) + (w3 * c2) + rd;
		var m2 = (w0 * c2) + (w1 * c0) + (w2 * c3) + (w3 * c1) + rd;
		var m3 = (w0 * c3) + (w1 * c1) + (w2 * c2) + (w3 * c0) + rd;
		
		d.set_m0(m0);
		d.set_m1(m1);
		d.set_m2(m2);
		d.set_m3(m3);
		
		
		// recurse 4 sub quads
		// sub quad length 
		var qs = Math.floor(length / 4);
		var q0 = d.get_quad0();
		var q1 = d.get_quad1();
		var q2 = d.get_quad2();
		var q3 = d.get_quad3();
		
		this.plasma(q0, qs);
		this.plasma(q1, qs);
		this.plasma(q2, qs);
		this.plasma(q3, qs);

	}
}

var d = {
	"init": function() {
		this.width = s.can.width;
		this.height = s.can.height;
		this.pixels = new Array(this.width * this.height);
		this.begin;
		this.length;
		this.d;
		this.md;
	},
	"set_sub": function(begin0, length0) {
		this.begin = begin0;
		this.length = length0;
		
		this.calc_dims();
	},
	"calc_dims": function() {
		this.d = Math.floor(Math.sqrt(this.length));
		this.md = this.d >> 1;
	},
	"get_xy": function(x, y) {
		var i = Math.floor(this.width * y + x);
		return this.pixels[i];
	},
	"set_xy": function(x, y, val) {
		var i = Math.floor(this.width * y + x);
		this.pixels[i] = val;
	},
	"get_c0": function() {
		return this.pixels[this.begin];
	},
	"get_c1": function() {
		return this.pixels[this.begin + (this.d - 1)];
	},
	"get_c2": function() {
		return this.pixels[this.begin + ((this.d - 1) * (this.width))];
	},
	"get_c3": function() {
		return this.pixels[this.begin + ((this.d - 1) * (this.width + 1))];
	},
	"set_e0": function(val) {
		this.pixels[this.begin + (this.md - 1)] = val;
	},
	"set_e1": function(val) {
		this.pixels[this.begin + (this.md)] = val;
	},
	"set_e2": function(val) {
		this.pixels[this.begin + ((this.md - 1) * this.width)] = val;
	},
	"set_e3": function(val) {
		this.pixels[this.begin + ((this.md) * this.width)] = val;
	},
	"set_e4": function(val) {
		this.pixels[this.begin + ((this.md - 1) * this.width) + (this.d - 1)] = val;
	},
	"set_e5": function(val) {
		this.pixels[this.begin + ((this.md) * this.width) + (this.d - 1)] = val;
	},
	"set_e6": function(val) {
		this.pixels[this.begin + ((this.d - 1) * this.width) + (this.md - 1)] = val;
	},
	"set_e7": function(val) {
		this.pixels[this.begin + ((this.d - 1) * this.width) + (this.md)] = val;
	},
	"set_m0": function(val) {
		this.pixels[this.begin + ((this.md - 1) * this.width) + (this.md - 1)] = val;
	},
	"set_m1": function(val) {
		this.pixels[this.begin + ((this.md - 1) * this.width) + (this.md)] = val;
	},
	"set_m2": function(val) {
		this.pixels[this.begin + ((this.md) * this.width) + (this.md - 1)] = val;
	},
	"set_m3": function(val) {
		this.pixels[this.begin + ((this.md) * this.width) + (this.md)] = val;
	},
	"get_quad0": function() {
		var i0 = this.begin;
		
		return i0;
	},
	"get_quad1": function() {
		var i0 = this.begin + this.md;
		
		return i0;
	},
	"get_quad2": function() {
		var i0 = Math.floor(this.begin + (this.md * this.width));
		
		return i0;
	},
	"get_quad3": function() {
		var i0 = Math.floor(this.begin + (this.md * this.width) + this.md);
		
		return i0;
	}
}

var t = {
	"init": function() {
		/*
		s.con.font = "48pt sans-serif";
		s.con.fillStyle = 'rgba(48,48,48,1.0)';
		s.con.fillText("speed test",96,128);
		s.con.fillText("click to run",90,384);
		*/
		
		s.con.fillStyle = 'rgba(255,255,255,1.0)';
		s.con.fillRect(0,108,s.can.width-64,48);
		s.con.font = "24pt monospace";
		this.bench = "HTML5 Canvas Plasma";
		for (var i = 0; i < this.bench.length; i++) {
			var c0 = this.bench.charAt(i);
			s.con.fillStyle = 'rgba(55,55,55,1.0)';
			s.con.fillText(c0, 36 + i * 20, 142); // "HTML5 Canvas Plasma Benchmark", 4, 162);
		}

		s.con.fillStyle = 'rgba(255,255,255,1.0)';
		s.con.fillRect(128,300,s.can.width-128,40);
		s.con.font = "18pt monospace";
		this.perf = "test your device's speed";
		s.con.fillStyle = "rgba(25,25,25,1.0)";
		s.con.fillText(this.perf,146,328);

		s.con.fillStyle = "rgba(255,255,255,1.0)";
		s.con.fillRect(76,426,350,40);
		s.con.font = "18pt monospace";
		this.click = "click anywhere to start";
		s.con.fillStyle = "rgba(35,35,35,1.0)";
		s.con.fillText(this.click,90,455);
	},
	"update": function(f0) {
		/*
		s.con.font = "42pt sans-serif";
		s.con.fillStyle = 'rgba(50,50,50,1.0)';
		s.con.fillText("result: " + f0 + "ms",96,150);
		s.con.fillText("avg: 1000ms", 96, 340);
		*/
		s.con.fillStyle = "rgba(0,0,0,1.0)";
		s.con.fillRect(0,450,s.can.width,54);
		s.con.font = "17pt sans-serif";
		this.split = "your result = " + f0 + "ms. global average = 1000ms.";
		s.con.fillStyle = "rgba(255,255,255,1.0)";
		s.con.fillText(this.split,8,484);
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
	},
	"f2rgb": function(h) {
		var r, g, b;
		var l = 0.7; // 0.7
		var s = 0.9; // 0.9
		function hue_to_rgb(p, q, t){
			if (t < 0) 
				t += 1;
			if (t > 1) 
				t -= 1;
			if (t < 1 / 6) 
				return p + (q - p) * 6 * t;
			if (t < 1 / 2) 
				return q;
			if (t < 2 / 3) 
				return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		}
		
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hue_to_rgb(p, q, h + 1 / 3);
		g = hue_to_rgb(p, q, h);
		b = hue_to_rgb(p, q, h - 1 / 3);
		
		r = Math.floor(r * 255);
		g = Math.floor(g * 255);
		b = Math.floor(b * 255);
		
		var rgb = new Array(3);
		rgb[0] = r;
		rgb[1] = g;
		rgb[2] = b;
		
		return rgb;
	}
}

var l = {
	"load": function() {
		s.init();
	}
}

window.onload = l.load;
