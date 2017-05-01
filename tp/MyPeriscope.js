var degToRad = Math.PI / 180.0;

function MyPeriscope(scene, size){
    CGFobject.call(this,scene);
    this.scene = scene;
	
	this.size = size;
	this.pole = new MyCylinder(this.scene, 8,7);
    this.top = new MyCylinder(this.scene,8,7);
	this.glass = new MyCircle(this.scene,8);
	this.back = new MyCircle(this.scene,8);

    this.initBuffers();
}

MyPeriscope.prototype = Object.create(CGFobject.prototype);
MyPeriscope.prototype.constructor=MyPeriscope;

MyPeriscope.prototype.display = function () {
    
    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.2);
    	this.scene.scale(0.05,this.size,0.05);
    	this.scene.rotate(90*degToRad,1,0,0);
    	this.pole.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.05);
    	this.scene.scale(0.05,0.05,0.2);
		this.top.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.05);
    	this.scene.scale(0.05,0.05,0.05);
    	this.scene.rotate(180*degToRad,0,1,0);
		this.glass.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.25);
    	this.scene.scale(0.05,0.05,0.05);
		this.back.display();
    this.scene.popMatrix();
}
