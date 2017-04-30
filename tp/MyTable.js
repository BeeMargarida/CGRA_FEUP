/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
	CGFobject.call(this,scene);
	this.quad = new MyUnitCubeQuad(this.scene);

	this.materialC = new CGFappearance(this.scene);
	this.materialC.setAmbient(0.3,0.3,0.3,1);
	this.materialC.setDiffuse(0.2,0.12,0.0,1);
	this.materialC.setSpecular(0.1,0.1,0.1,1);	
	this.materialC.setShininess(120);

	this.materialD = new CGFappearance(this.scene);
	this.materialD.setAmbient(1,1,0.9,1);
	this.materialD.setDiffuse(1,1,0,0);
	this.materialD.setSpecular(1,1,1,1);	
	this.materialD.setShininess(120);

	this.tableApperance = new CGFappearance(this.scene);
	this.tableApperance.loadTexture("../resources/images/table.png");

};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	
	this.materialD.apply();
	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,-1.35);
	this.scene.scale(0.3,3.5,0.3);//perna esquerda de trás
	this.quad.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.35,1.75,1.35);
	this.scene.scale(0.3,3.5,0.3);//perna esquerda da frente
	this.quad.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,1.35);
	this.scene.scale(0.3,3.5,0.3);//perna direita da frente
	this.quad.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
	this.scene.translate(2.35,1.75,-1.35); 
	this.scene.scale(0.3,3.5,0.3);//perna direita de trás
	this.quad.display();
	this.scene.popMatrix();
	this.scene.materialDefault.apply();
	
	//tampo
	this.scene.pushMatrix();
	this.materialC.apply();
	this.tableApperance.apply();
	this.scene.translate(0,3.65,0);
	this.scene.scale(5,0.3,3);
	this.quad.display();
	this.scene.materialDefault.apply();
	this.scene.popMatrix();


};
