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
	},
	"next": function() {
		d.load('/ab/leek.js', function(){leek.init()});	
	},
	"draw": function() {
		motd.tick++;
		if (motd.tick > 100) {
			l.pause();
			motd.next();
		}
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
	}
}
