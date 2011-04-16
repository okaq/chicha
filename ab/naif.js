var naif = {
	"init": function() {
		this.bkgd = c.rgba(1.0);
		this.init_grid();
		g.set(naif.draw);
		this.tick = 0;
	},
	"init_grid": function() {
		this.grid = new Array(g.nX * g.nY);
		for (var i = 0; i < this.grid.length; i++) {
			this.grid[i] = new naif.cell(i);
		}
	},
	"cell": function(i0) {
		this.hue = (Math.random() * 255) >>> 0;
		this.x0 = (i0 % g.nX) * g.bX;
		this.y0 = ((i0 / g.nX) >>> 0) * g.bY;
	},
	"draw": function() {
		naif.tick++;
		g.clear(naif.bkgd);
		for (var i = 0; i < naif.grid.length; i++) {
			// var x0 = (i % g.nX) * g.bX;
			// var y0 = ((i / g.nX) >>> 0) * g.bY;
			g.con.fillStyle = c.hue(naif.grid[i].hue);
			g.con.fillRect(naif.grid[i].x0, naif.grid[i].y0, g.bX, g.bY);
		}
	}
}
/*
*	hsla space is unintuitive.
*   hues may not cycle evenly for fixed s/l/a.
*   ref: css3-color module.
*
*   grid class with proximity, edge, neural net
*   properties can be kept in g level class.
*   class can be generic to take any size (nx,ny),
*   and auto determine edge cases.
*/
