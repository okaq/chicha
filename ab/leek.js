var leek = {
	"init": function() {
		this.bkgd = c.rgba(1.0);
		this.init_grid();
		g.set(leek.draw);
		this.tick = 0;
	},
	"init_grid": function() {
		this.grid = new Array(g.nX * g.nY);
		this.life = new Array(g.nX * g.nY);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = c.rgba();
		}
		for (var i = 0; i < this.life.length; i++) {
			var b0 = (Math.random() > 0.5) ? true : false;
			this.life[i] = b0;
		}
	},
	"step_grid": function() {
		var grid0 = new Array(g.nX * g.nY);
		for (var i = 0; i < ((g.nX - 2) * (g.nY - 2)); i++) {
			var ix = (1 + i) % g.nX;
			var iy = (1 + i) % g.nY;
			var i0 = iy + g.nX + ix;
			var s0 = 0;
			if ((i0 - g.nX) == true) {
				s0 += 1;
			}
			if ((i0 - 1) == true) {
				s0 += 1;
			}
			if ((i0 + 1) == true) {
				s0 += 1;
			}
			if ((i0 + g.nX == true) {
				s0 += 1;
			}
			if (s0 == 0) {
				
			}
		}
	},
	"draw": function() {
		leek.tick++;
		g.clear(leek.bkgd);
		for (var i = 0; i < leek.grid.length; i++) {
			if (leek.life[i] == true) {
				var x0 = (i % g.nX) * g.bX;
				var y0 = ((i / g.nX) >>> 0) * g.bY;
				g.con.fillStyle = leek.grid[i];
				g.con.fillRect(x0, y0, g.bX, g.bY);
			}	
		}

		if (leek.tick % 160 == 0) {
			leek.init_grid();
		}

		if (leek.tick % 8 == 0) {
			leek.step_grid();
		}
	}
}
/*
* life - need a way to keep track of proximity
*/
