var leek = {
	"init": function() {
		this.bkgd = c.rgba(1.0);
		this.init_grid();
		g.set(leek.draw);
		this.tick = 0;
	},
	"init_grid": function() {
		this.grid = new Array(g.nX * g.nY);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = c.rgba();
		}
	},
	"draw": function() {
		leek.tick++;
		g.clear(leek.bkgd);
		for (var i = 0; i < leek.grid.length; i++) {
			var x0 = (i % g.nX) * g.bX;
			var y0 = ((i / g.nX) >>> 0) * g.bY;
			g.con.fillStyle = leek.grid[i];
			g.con.fillRect(x0, y0, g.bX, g.bY);
		}

		if (leek.tick % 16 == 0) {
			leek.init_grid();
		}
	}
}
