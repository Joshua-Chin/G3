    g3.matrix = function(){

	var ID = [
	    1,0,0,0,
	    0,1,0,0,
	    0,0,1,0,
	    0,0,0,1];

	function rotateX(x){
	    var sin = Math.sin(x), cos = Math.cos(x);
	    return [
		1,  0,   0,0,
		0,cos,-sin,0,
		0,sin, cos,0,
		0,  0,   0,1];
	};

	function rotateY(x){
	    var sin = Math.sin(x), cos = Math.cos(x);
	    return [
		cos,0,-sin,0,
		0,  1,   0,0,
		sin,0, cos,0,
		0,  0,   0,1];
	};

	function rotateZ(x){
	    var sin = Math.sin(x), cos = Math.cos(x);
	    return [
		cos,-sin,0,0,
		sin, cos,0,0,
		0  ,   0,1,0,
		0  ,   0,0,1];
	};

	function scale(x,y,z){
	    return [
		x,0,0,0,
		0,y,0,0,
		0,0,z,0,
		0,0,0,1];
	};

	function translate(x,y,z){
	    return [
		1,0,0,x,
		0,1,0,y,
		0,0,1,z,
		0,0,0,1];
	};

	function mul(){
	    var args = arguments;
	    var out = args[0];
	    for(var i=1; i<args.length; i++){
		if(args[i].length == 4){out = mulVector(out, args[i]);}
		out = mulMatrix(out, args[i]);
	    }
	    return out;
	}

	function mulMatrices(){
	    var args = arguments;
	    var out = args[0];
	    for(var i=1; i<args.length; i++){
		out = mulMatrix(out, args[i]);
	    }
	    return out;
	}

	function mulMatrix(M1, M2){
	    var out = [];
	    for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
		    var sum = 0;
		    for(var k=0;k<4;k++){
			sum += M1[4*i+k] * M2[j+4*k];
		    }
		    out[4*i+j] = sum;
		}
	    }
	    return out;
	};

	function mulVector(M, v){
	    var out = [];
	    for(var i=0;i<4;i++){
		var sum = 0;
		for(var j=0;j<4;j++){
		    sum += M[4*i+j] * v[j];
		}
		out[i] = sum;
	    }
	    return out;
 	}

	function mulVectors(M, vs){
	    var out = [];
	    for(var k=0; k<vs.length; k+=4){
		for(var i=0; i<4; i++){
		    var sum = 0;
		    for(var j=0; j<4; j++){
			sum += M[4*i+j] * vs[k+j];
		    }
		    out[k+i] = sum;
		}
	    }
	    return out;
	}

	return {
	    mul:mul,
	    scale:scale,
	    translate:translate,
	    rotateX:rotateX,
	    rotateY:rotateY,
	    rotateZ:rotateZ,
	    mulMatrices:mulMatrices,
	    mulMatrix:mulMatrix,
	    mulVector:mulVector,
	    mulVectors:mulVectors
	};

    }();
