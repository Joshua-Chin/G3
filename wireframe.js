g3.wireframe = function(points, indices){

    for(var i=0;i<points.length;i++){
		points[i] = g3.api.point(points[i]);
    }
    points = flatten(points);
    indices = flatten(indices);

    function flatten(arr){
		var out = [];
		for(var i = 0; i < arr.length; i++) {
			for(var j=0; j < arr[i].length; j++){
			out.push(arr[i][j]);
			}
		}
		return out;
    }
	
	function at(x,y,z){
		this.position = [x,y,z];
	}
	
	function scaled(x,y,z){
		this.scale = [x,y,z];
	}
	
	function move(dx,dy,dz){
		var p = this.position;
		p[0] += dx, p[1] += dy, p[2] += dz;
	}
	
	function transformMatrix(){
		var p = this.position, s = this.scale, h = this.heading;
		var translate = g3.matrix.translate(p[0],p[1],p[2]);
		var scale = g3.matrix.scale(s[0],s[1],s[2]);
		var rotate = g3.matrix.rotate(h[0],h[1],h[2]);
		return g3.matrix.mulMatrices(translate, scale, rotate);
	}

    return {
		points:points,
		indices:indices,
		heading:[0,0,0],
		facing:facing,
		rotate:rotate,
		scale:[1,1,1],
		scaled:scaled,
		position:[0,0,0],
		at:at,
		move:move
    };

}