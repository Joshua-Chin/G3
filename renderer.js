g3.renderer = function(canvas) {

	var height = canvas.height;
	var width = canvas.width;

	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0, 0, width, height);

	var b = new ArrayBuffer(imageData.data.length);
	var b8 = new Uint8ClampedArray(b);
	var b32 = new Uint32Array(b);

	function render() {
		imageData.data.set(b8);
		context.putImageData(imageData, 0, 0);
		clear();
	}

	var black = g3.api.color("black");

	function clear() {
		for (var i = 0; i < b32.length; i++) {
			b32[i] = black;
		}
	}

	function drawPoint(p, c) {
		p = g3.api.point(p), c = g3.api.color(c);
		_drawPoint(p[0], p[1], c);
	}

	function _drawPoint(x, y, c) {
		x = x | 0, y = y | 0, c = c | 0;
		if (0 <= x && x < width && 0 <= y && y < height) {
			b32[y * width + x] = c;
		}
	}

	function __drawPoint(x, y, c) {
		x = x | 0, y = y | 0, c = c | 0;
		b32[y * width + x] = c;
	}

	function drawLine(p1, p2, c) {
		p1 = g3.api.point(p1), p2 = g3.api.point(p2), c = g3.api.color(c);
		_drawLine(p1[0], p1[1], p2[0], p2[1], c);
	}

	function _drawLine(x1, y1, x2, y2, c) {
		x1 = x1 | 0, x2 = x2 | 0, y1 = y1 | 0, y2 = y2 | 0, colorInt = c | 0;
		var dx = Math.abs(x1 - x2);
		var dy = Math.abs(y1 - y2);
		var sx, sy;
		if (x2 > x1) {
			sx = 1;
		} else {
			sx = -1;
		};
		if (y2 > y1) {
			sy = 1;
		} else {
			sy = -1;
		};
		var err = dy - dx;
		while (true) {
			if (x1 == x2 && y1 == y2) {
				_drawPoint(x1, y1, colorInt);
				break;
			}
			if (2 * err < dy) {
				err += dy;
				x1 += sx;
			}
			if (x1 == x2 && y1 == y2) {
				_drawPoint(x1, y1, colorInt);
				break;
			}
			if (2 * err > -dx) {
				err -= dx;
				y1 += sy;
			}
			_drawPoint(x1, y1, colorInt);
		}
	}

	function sphere(r) {
		var out = [];
		for (var i = 0; i < 16; i++) {
			var theta = Math.PI * i / 16;
			for (var j = 0; j <= 16; j++) {
				var phi = Math.PI * j / 8;
				var px = r * Math.cos(theta) * Math.sin(phi);
				var py = r * Math.sin(theta) * Math.sin(phi);
				out.push([px, py, r * Math.cos(phi), 1]);
			}
		}
		return g3.points(out);
	}

	function torus(R, r) {
		var out = [];
		for (var i = 0; i < 16; i++) {
			var theta = Math.PI * i / 8;
			for (var j = 0; j <= 16; j++) {
				var phi = Math.PI * j / 8;
				var px = Math.cos(theta) * (r * Math.cos(phi) + R);
				var py = Math.sin(theta) * (r * Math.cos(phi) + R);
				out.push([px, py, r * Math.sin(phi), 1]);
			}
		}
		return g3.points(out);
	}

	function drawPoints(points, color) {
		_drawPoints(g3.matrix.mulVectors(points.transformMatrix(), points.points), g3.api.color(color));
	}

	function _drawPoints(points, color) {
		for (var i = 0; i < points.length; i += 4) {
			_drawPoint(points[4 * i], points[4 * i + 1]);
		}
	}

	function drawWireframe(wireframe, color) {
		_drawWireFrame(g3.matrix.mulVectors(wireframe.transformMatrix(), wireframe.points), wireframe.indices, g3.api.color(color));
	}

	function _drawWireFrame(points, indices, color) {
		for (var i = 0; i < indices.length; i += 2) {
			var p1 = indices[i], p2 = indices[i + 1];
			_drawLine(points[4 * p1], points[4 * p1 + 1], points[4 * p2], points[4 * p2 + 1], color);
		}
	}

	function drawCircle(x, y, r, c) {
		var fx = x + r;
		var fy = y;
		for (var t = 0.01; t < 2 * Math.PI; t += 0.01) {
			var ny = y + r * Math.sin(t);
			var nx = x + r * Math.cos(t);
			_drawLine(fx, fy, nx, ny, c);
			fx = nx;
			fy = ny;
		}
	}

	function drawHermiteCurve(x0, y0, x1, y1, x2, y2, x3, y3, color) {
		var fx = x0;
		var fy = y0;
		for (var t = 0.01; t < 1; t += 0.005) {
			var p = hermitePoint(x0, y0, x1, y1, x2, y2, x3, y3, t);
			_drawLine(fx, fy, p[0], p[1], color);
			fx = p[0];
			fy = p[1];
		}
	}

	function hermitePoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
		var a = (1 + 2 * t) * Math.pow(1 - t, 2);
		var b = t * Math.pow(1 - t, 2);
		var c = t * t * (3 - 2 * t);
		var d = t * t * (1 - t);
		var x = a * x0 + b * x1 + c * x2 + d * x3;
		var y = a * y0 + b * y1 + c * y2 + d * y3;
		return [x, y];
	}

	function drawBezierCurve(x0, y0, x1, y1, x2, y2, x3, y3, color) {
		var fx = x0;
		var fy = y0;
		for (var t = 0.01; t < 1; t += 0.005) {
			var p = bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t);
			_drawLine(fx, fy, p[0], p[1], color);
			fx = p[0];
			fy = p[1];
		}
	}

	function bezierPoint(x0, y0, x1, y1, x2, y2, x3, y3, t) {
		var a = Math.pow(1 - t, 3);
		var b = 3 * t * Math.pow(1 - t, 2);
		var c = 3 * t * t * (1 - t);
		var d = t * t * t;
		var x = a * x0 + b * x1 + c * x2 + d * x3;
		var y = a * y0 + b * y1 + c * y2 + d * y3;
		return [x, y];
	}

	return {
		drawLine : drawLine,
		drawPoint : drawPoint,
		drawWireframe : drawWireframe,
		drawBezierCurve : drawBezierCurve,
		drawHermiteCurve : drawHermiteCurve,
		drawCircle : drawCircle,
		drawPoints : drawPoints,
		sphere : sphere,
		torus : torus,
		render : render,
	};

};
