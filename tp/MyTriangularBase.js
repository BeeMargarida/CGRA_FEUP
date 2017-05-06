 function MyTriangularBase(scene) {
 	CGFobject.call(this, scene);
    
    this.triangle = new MyTriangle(this.scene);
 	this.quad = new MyQuad(this.scene,0,1,0,1);
 };

 MyTriangularBase.prototype = Object.create(CGFobject.prototype);
 MyTriangularBase.prototype.constructor = MyTriangularBase;

 MyTriangularBase.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
 	this.triangle.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(180 * degToRad, 1, 0, 0);
 	this.scene.rotate(-90*degToRad,0,0,1)
 	this.scene.translate(0, 0, 0.5);
 	this.triangle.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
 	this.scene.rotate(45*degToRad,0,1,0);
 	this.scene.scale(Math.sqrt(2),1,1);
 	//this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();
 };