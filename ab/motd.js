var motd = {
	"init": function() {
		this.now = (new Date()).toUTCString();
		this.msg = "Greetings. Request served at: " + this.now + ". Let's begin some thing new.";
		console.log(this.msg);
		
		// init text styles
		// g.draw = this.draw;
		// l.loop();
		g.set(motd.draw);
		this.tick = 0;
		d.load('/ab/chardata.js', motd.chars());
	},
	"next": function() {
		d.load('/ab/leek.js', function(){leek.init()});	
	},
	"chars": function() {
		this.chars_load = true;
	},
	"draw": function() {
		motd.tick++;
		if (motd.tick > 16) {
			l.pause();
			motd.next();
		}
		/*
		g.con.fillStyle = c.rgba();
		g.con.fillRect(0, 0, g.epsilon.width, g.epsilon.height);
		g.con.fillStyle = c.rgba(1.0); // 'rgba(0,0,0,1.0)';
		// g.con.font = '24pt Geo'; // '20pt Arial';
		// g.con.fillText('motd draw call: ', 256, 256);
		// g.con.fillText(motd.msg, 32, 328);
		// var p0 = g.cX / 2 >>> 0;
		// var p1 = g.cY / 4 >>> 0;
		var p1 = g.epsilon.height / 4;
		g.con.font = '128px monospace'; // p0 + 'px Geo';
		g.con.fillText(" O K A Q ", 0, p1*2);
		// l.pause();
		*/
		if (motd.chars_load == true) {
			var id0 = g.con.createImageData(g.bX, g.bY);
			var id1 = g.con.createImageData(g.bX, g.bY);
			var id2 = g.con.createImageData(g.bX, g.bY);
			var id3 = g.con.createImageData(g.bX, g.bY);
			var c0 = [c.r8(),c.r8(),c.r8(),c.r8()];
			var c1 = [c.r8(),c.r8(),c.r8(),c.r8()];
			var c2 = [c.r8(),c.r8(),c.r8(),c.r8()];
			var c3 = [c.r8(),c.r8(),c.r8(),c.r8()]; // c.comp();
			for (var i = 0; i < id0.data.length; i+=4) {
				 var i0 = (i / 4) >>> 0;
				 if (chardata.A[i0] == 1) {
				 	id0.data[i+0] = c0[0];
					id0.data[i+1] = c0[1];
					id0.data[i+2] = c0[2];
					id0.data[i+3] = 255; // c0[3];
				 }
				 if (chardata.O[i0] == 1) {
				 	id1.data[i+0] = c1[0];
					id1.data[i+1] = c1[1];
					id1.data[i+2] = c1[2];
					id1.data[i+3] = 255; // c0[3];
				 }
				 if (chardata.Q[i0] == 1) {
				 	id2.data[i+0] = c2[0];
					id2.data[i+1] = c2[1];
					id2.data[i+2] = c2[2];
					id2.data[i+3] = 255; // c0[3];
				 }
				 if (chardata.K[i0] == 1) {
				 	id3.data[i+0] = c3[0];
					id3.data[i+1] = c3[1];
					id3.data[i+2] = c3[2];
					id3.data[i+3] = 255; // c3[3];
				 }

			}
			g.con.putImageData(id0,32,0);
			g.con.putImageData(id1,0,0);
			g.con.putImageData(id2,48,0);
			g.con.putImageData(id3,16,0);
		}
	}
}
