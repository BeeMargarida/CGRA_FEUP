function MyClockHand(scene, size) {
	CGFobject.call(this,scene);
	this.angle = 0;
	this.size = size
	this.pointer = new MyUnitCubeQuad(scene);
	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.display = function() {
	this.scene.rotate(-this.angle * Math.PI/180.0,0,0,1);
	this.scene.scale(0.03,this.size,0.03);
	this.scene.translate(0,-0.5,0);
	this.pointer.display();
}

MyClockHand.prototype.setAngle = function(angle){
	this.angle = angle;
}