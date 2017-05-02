/*var degToRad = Math.PI / 180.0;
function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene,0,1,0,1);
}; 

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad; 

MyUnitCubeQuad.prototype.display = function() { //visualizado com eixo z para cima
 	this.scene.pushMatrix();
 	this.quad.display(); //face de cima
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.translate(0,0,-1);//face de baixo
 	this.quad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(90*this.deg2rad,0,1,0);//face frente esquerda
 	this.quad.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.rotate(-90*this.deg2rad,1,0,0);//face frente direita
 	this.quad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(90*this.deg2rad,1,0,0);//face tras esquerda
 	this.quad.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.rotate(90*this.deg2rad,0,-1,0);//face tras direita
 	this.quad.display();
 	this.scene.popMatrix();
}*/

/**
 * MyUnitCubeQuad
 * @constructor
 */
 function MyUnitCubeQuad(scene) {
 	CGFobject.call(this, scene);

 	this.quad = new MyQuad(this.scene,0,1,0,1);
 };

 MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
 MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

 MyUnitCubeQuad.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(180 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
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

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();
 };



