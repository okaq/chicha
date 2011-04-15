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
		for (var i = 0; i < grid0.length; i++) {
			grid0[i] = this.life[i];
		}
		var s1 = ((g.nX - 1) * (g.nY - 1)); 
		for (var i = 0; i < s1; i++) {
			// var ix = (1 + i) % g.nX;
			// var iy = (1 + i) % g.nY;
			var ix = i % s1;
			var iy = i / s1 >>> 0;
			// var i0 = iy + g.nX + ix;
			var i0 = (g.nX * (iy + 1))  + (1 + ix)
			var s0 = 0;
			// nearest neighbor calculation
			if (this.life[(i0 - g.nX - 1)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 - g.nX)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 - g.nX + 1)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 - 1)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 + 1)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 + g.nX - 1)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 + g.nX)] == true) {
				s0 += 1;
			}
			if (this.life[(i0 + g.nX + 1)] == true) {
				s0 += 1;
			}
			// life rules
			if ((s0 == 3) && this.life[i0] == false) {
				grid0[i0] = true;
			}
			if (this.life[i0] == true) {
				if ((s0 == 2) || (s0 == 3)) {
					grid0[i0] = true;
				} else {
					grid0[i0] = false;
				}
			}
		}
		for (var i = 0; i < grid0.length; i++) {
			this.life[i] = grid0[i];
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

		if (leek.tick % 600 == 0) {
			leek.init_grid();
		}

		if (leek.tick % 2 == 0) {
			leek.step_grid();
		}
	}
}
/*
* life - need a way to keep track of proximity
*/
