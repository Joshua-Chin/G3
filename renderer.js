g3.renderer = function(canvas){
    
    var height = canvas.height;
    var width = canvas.width;
    
    var context = canvas.getContext("2d");
    var imageData = context.getImageData(0,0,width,height);
    
    var b = new ArrayBuffer(imageData.data.length);
    var b8 = new Uint8ClampedArray(b);
    var b32 = new Uint32Array(b);

    function render(){	
	imageData.data.set(b8);
	context.putImageData(imageData,0,0);
	clear();
    }

    var black = g3.api.color("black");

    function clear(){
	for(var i=0;i<b32.length;i++){
	    b32[i]=black;
	}
    }

    function drawPoint(p, c){
	p = g3.api.point(p), c = g3.api.color(c);
	_drawPoint(p[0],p[1],c);
    }

    function _drawPoint(x,y, c){
	x=x|0, y=y|0, c=c|0;
	if(0<=x&&x<width && 0<=y&&y<height){
	    b32[y*width+x] = c; 
	}
    }

    function __drawPoint(x,y, c){
	x=x|0, y=y|0, c=c|0;
	b32[y*width+x] = c;
    }

    function drawLine(p1,p2,c){
	p1=g3.api.point(p1),p2=g3.api.point(p2),c=g3.api.color(c);
	_drawLine(p1[0],p1[1],p2[0],p2[1],c);
    }

    function _drawLine(x1,y1, x2,y2, c){
    	x1=x1|0,x2=x2|0,y1=y1|0,y2=y2|0,colorInt=c|0;
	var dx = Math.abs(x1-x2);
	var dy = Math.abs(y1-y2);
	var sx, sy;
	if(x2 > x1){sx=1;}else{sx=-1;};
	if(y2 > y1){sy=1;}else{sy=-1;};
	var err = dy - dx;
	while(true){
	    if(x1==x2 && y1==y2){
		_drawPoint(x1, y1, colorInt);
		break;
	    }
	    if(2*err<dy){
		err += dy;
		x1 += sx;
	    }
	    if(x1==x2 && y1==y2){
		_drawPoint(x1, y1, colorInt);
		break;
	    }
	    if(2*err>-dx){
		err -= dx;
		y1 += sy;
	    }
	    _drawPoint(x1, y1, colorInt);
	}
    }

    function drawWireframe(wireframe, color){
	_drawWireFrame(g3.matrix.mulVectors(wireframe.transformMatrix(), wireframe.points), wireframe.indices, g3.api.color(color));
    }

    function _drawWireFrame(points, indices, color){
	for(var i=0; i<indices.length; i+=2){
	    var p1 = indices[i], p2 = indices[i+1];
	    _drawLine(points[4*p1],points[4*p1+1], points[4*p2], points[4*p2+1], color);
	}
    }

    return {
	drawLine:drawLine,
	drawPoint:drawPoint,
	drawWireframe:drawWireframe,
	render:render,
    };

}
