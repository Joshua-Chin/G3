window.onload = function(){
	var c = document.getElementById("canvas");
	var r = g3.renderer(c);

    console.log("loaded");
       var cube = g3.wireframe(
	[[-100,-100,100],[100,-100,100],[100,100,100],[-100,100,100],
	 [-100,-100,-100],[100,-100,-100],[100,100,-100],[-100,100,-100]],
	[[0,1],[1,2],[2,3],[0,3],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]).at(200,200);

    console.log(cube);
    cube.facing = [10,3,4];

    function render(){
	r.drawWireframe(cube, "red");
	r.render();
    }

    render();
};