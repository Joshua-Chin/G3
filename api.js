g3.api = function(){

    var isBigEndian = function(){
	var b32 = new Uint32Array(1);
	var b8 = new Uint8Array(b32.buffer);
	b32[0] = 1;
	return b8[3] == 1;
    }();

    function color(c){
	if(typeof c == "number"){
	    return c|0;
	}
	if(typeof c == "string"){
	    c = g3.colors[c];
	}
	var r=c.r,g=c.g,b=c.b,a=c.a;
	if(r===undefined){r=0;}
	if(g===undefined){g=0;}
	if(b===undefined){b=0;}
	if(a===undefined){a=255;}
	if(isBigEndian){
	    return r<<24|g<<16|b<<8|a;
	}else{
	    return a<<24|b<<16|g<<8|r;
	}
    }

    function point(p){
	if(p instanceof Array){
	    var p0=p[0],p1=p[1],p2=p[2];
	    if(p0===undefined || p1===undefined){
		throw "Please pass a valid point, recieved Array:"+p;
	    }
	    if(p2===undefined){p2=0};
	    return [+p0,+p1,+p2, 1];
	}
	var x=p.x,y=p.y,z=p.z;
	if(x===undefined||y===undefined){
		throw "Please pass a valid point, recieved Object:"+p;
	}
	if(z===undefined){z=0;}
	return [+x,+y,+z, 1];
    }

    return {
	color:color,
	point:point
    };

}();