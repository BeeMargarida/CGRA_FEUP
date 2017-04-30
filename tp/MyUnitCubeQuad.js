function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
}; 

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad; 

MyUnitCubeQuad.prototype.display = function() { //visualizado com eixo z para cima
 	this.deg2rad=Math.PI/180.0;
 	this.quad.display(); //face de cima
 	
 	this.scene.pushMatrix();
 	this.scene.translate(0,0,-1);//face de baixo
 	this.quad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.rotate(90*this.deg2rad,0,1,0);//face frente esquerda
 	this.quad.display();
 	this.scene.popMatrix();
 	
 	this.scene.pushMatrix();
 	this.scene.rotate(90*this.deg2rad,-1,0,0);//face frente direita
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

}


