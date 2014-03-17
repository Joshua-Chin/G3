window.onload = function() {
	var c = document.getElementById("canvas");
	var r = g3.renderer(c);
	var cube = g3.wireframe([
		[100, 100, 100], [100, -100, 100], [-100, -100, 100], [-100, 100, 100],
		[100, 100, -100], [100, -100, -100], [-100, -100, -100], [-100, 100, -100]],
		[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]]
		).at(200,200,200).rotated(Math.PI/2, 0, 0);
	function main() {
		cube.rotate(.01,.02,.03);
		cube.move(0.1,0,0);
		r.drawWireframe(cube, "red");
		r.render();
		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
};
