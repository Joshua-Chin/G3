g3.points = function(points) {

	for (var i = 0; i < points.length; i++) {
		points[i] = g3.api.point(points[i]);
	}
	points = flatten(points);

	function flatten(arr) {
		var out = [];
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0; j < arr[i].length; j++) {
				out.push(arr[i][j]);
			}
		}
		return out;
	}

	function at(x, y, z) {
		this.position = [x, y, z];
		return this;
	}

	function scaled(x, y, z) {
		this.scale = [x, y, z];
		return this;
	}

	function move(dx, dy, dz) {
		var p = this.position;
		p[0] += dx, p[1] += dy, p[2] += dz;
	}
	
	function rotated(x,y,z){
		this.heading = [x,y,z];
		return this;
	}
	
	function rotate(dx,dy,dz){
		var h = this.heading;
		h[0] += dx, h[1] += dy, h[2] += dz;
	}

	function transformMatrix() {
		var p = this.position, s = this.scale, h = this.heading;
		var translate = g3.matrix.translate(p[0], p[1], p[2]);
		var scale = g3.matrix.scale(s[0], s[1], s[2]);
		var rotateX = g3.matrix.rotateX(h[0]);
		var rotateY = g3.matrix.rotateY(h[1]);
		var rotateZ = g3.matrix.rotateZ(h[2]);
		return g3.matrix.mulMatrices(translate, scale, rotateX, rotateY, rotateZ);
	}

	return {
		points : points,
		heading : [0, 0, 0],
		rotated : rotated,
		rotate : rotate,
		scale : [1, 1, 1],
		scaled : scaled,
		position : [0, 0, 0],
		at : at,
		move : move,
		transformMatrix: transformMatrix
	};

}; 