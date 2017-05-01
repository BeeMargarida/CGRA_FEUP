var degToRad = Math.PI / 180.0;

function MyPropeller(scene){
    CGFobject.call(this,scene);
    this.scene = scene;

    this.angle = 0;

    this.propCyl = new MyCylinder(this.scene,8,7);
	this.propCylIn = new MyCylinderInside(this.scene,8,7);
	this.propHel = new MyUnitCubeQuad(this.scene);
	this.middleProp = new MyLamp(this.scene,8,7);

    this.initBuffers();
}

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyPropeller;

MyPropeller.prototype.display = function () {
    this.scene.pushMatrix();
        this.scene.scale(0.4,0.4,0.4);
		this.propCyl.display();
		this.propCylIn.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.2);
    	this.scene.scale(0.6,0.2,0.1);
    	this.scene.rotate(this.angle*degToRad,0,0,1);
		this.propHel.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.1);
		this.scene.rotate(180*degToRad,1,0,0);
		this.scene.scale(0.1,0.1,0.1);
		this.middleProp.display();
	this.scene.popMatrix();
}

MyPropeller.prototype.update = function () {
    this.angle += 10;
}