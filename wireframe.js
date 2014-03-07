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

    return {
	points:points,
	indices:indices
    };

}