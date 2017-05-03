var degToRad = Math.PI / 180.0;

function MyTorpedo(scene,x,y,z,angle) {
    CGFobject.call(this,scene);

    this.cylinderBody = new MyCylinder(this.scene,8,7);
	this.frontBumper = new MyLamp(this.scene, 8,7);
	this.rearBumper = new MyLamp(this.scene, 8,7);
	this.barb = new MyTrap(this.scene);

    this.initBuffers();
}

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor=MyTorpedo;

MyTorpedo.prototype.display = function () {

    this.scene.pushMatrix();
		this.scene.translate(0,-1.5,0);
		this.scene.scale(0.2,0.2,2);
		this.cylinderBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,-1.5,0);
    	this.scene.rotate(180*degToRad,0,1,0);
    	this.scene.scale(0.2,0.2,0.2);
		this.frontBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,-1.5,2);
    	this.scene.scale(0.2,0.2,0.2);
		this.rearBumper.display();
    this.scene.popMatrix();

    //barbatana vertical de tras
   	this.scene.pushMatrix();
		this.scene.translate(0,-1.5,2);
		this.scene.scale(0.5,0.35,0.3);
		//this.scene.rotate(this.barbAngle*degToRad,0,1,0);
		this.barb.display();
	this.scene.popMatrix();

	//barbatana horizontal de tras
    this.scene.pushMatrix();
    	this.scene.translate(0,-1.5,2);
    	this.scene.scale(0.35,0.5,0.3);
    	this.scene.rotate(90*degToRad,0,0,1);
    	//this.scene.rotate(this.vertBarbAngle*degToRad,0,1,0);
		this.barb.display();
    this.scene.popMatrix();
}