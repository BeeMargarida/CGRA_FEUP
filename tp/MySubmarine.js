/* MySubmarine*/
var degToRad = Math.PI / 180.0;

function MySubmarine(scene,x,y,z,angle) {
	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.angle = Math.PI;
	this.w = false;
	this.a = false;
	this.s = false;
	this.d = false;
	this.q = false;
	this.e = false;
	this.p = false;
	this.l = false;
	this.speed = 0.1;
	this.vertAngle = 0;

	var d = new Date();
	this.startTime = d.getTime();

	this.cylinderBody = new MyCylinder(this.scene,8,7);
	this.frontBumper = new MyLamp(this.scene, 8,7);
	this.rearBumper = new MyLamp(this.scene, 8,7);
	this.cylinderTower = new MyCylinder(this.scene, 8,7);
	this.towerTop = new MyCircle(this.scene,8);

	this.barb = new MyTrap(this.scene);
	this.peri = new MyPeriscope(this.scene);
	this.prop1 = new MyPropeller(this.scene);
	this.prop2 = new MyPropeller(this.scene);

	this.barbAngle = 0;


	this.propeller = new MyCylinder(this.scene,8,7);
	this.insideProp = new MyCylinderInside(this.scene,8,7);
	this.rightProp = new MyUnitCubeQuad(this.scene);
	this.leftProp = new MyUnitCubeQuad(this.scene);
	this.middleProp = new MyLamp(this.scene,8,7);
	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor=MySubmarine;

MySubmarine.prototype.display = function () {
	
	this.scene.pushMatrix();
		this.scene.translate(0,0,-2);
		this.scene.scale(0.73,1,4.08);
		this.cylinderBody.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,-2);
    	this.scene.rotate(180*degToRad,0,1,0);
    	this.scene.scale(0.73,1,1);
		this.frontBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,2.08);
    	this.scene.scale(0.73,1,1);
		this.rearBumper.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,1.57,0);
    	this.scene.scale(0.5,1,0.88);
    	this.scene.rotate(90*degToRad,1,0,0);
		this.cylinderTower.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,1.57,0);
    	this.scene.scale(0.5,1,0.88);
    	this.scene.rotate(-90*degToRad,1,0,0);
		this.towerTop.display();
    this.scene.popMatrix();

	//periscope
	this.scene.pushMatrix();
		this.scene.translate(0,2.6,-0.7);
		this.peri.display();
	this.scene.popMatrix();

	//barbatana vertical de tras
   	this.scene.pushMatrix();
		this.scene.translate(0,0,2.3);
		this.scene.scale(1,1.5,1);
		this.scene.rotate(this.barbAngle*degToRad,0,1,0);
		this.barb.display();
	this.scene.popMatrix();

	//barbatana horizontal de tras
    this.scene.pushMatrix();
    	this.scene.translate(0,0,2.3);
    	this.scene.scale(1.5,1,1);
    	this.scene.rotate(90*degToRad,0,0,1);
		this.barb.display();
    this.scene.popMatrix();

	//barbatana horizontal da frente
  	this.scene.pushMatrix();
    	this.scene.translate(0,1.2,0.3);
    	this.scene.rotate(90*degToRad,0,0,1);
    	this.scene.rotate(180*degToRad,1,0,0);
		this.barb.display();
    this.scene.popMatrix();
	
	//Propellers
	//right
	this.scene.pushMatrix();
		this.scene.translate(1,-0.4,1.9);
		this.prop1.display();
	this.scene.popMatrix();

	//left
    this.scene.pushMatrix();
		this.scene.translate(-1,-0.4,1.9);
		this.prop2.display();
	this.scene.popMatrix();
};

MySubmarine.prototype.update = function(currTime) {
	var deltaTime = currTime - this.startTime;
	this.startTime = currTime;
	this.prop1.updateLeft(deltaTime, this.speed);
	this.prop2.updateRight(deltaTime, this.speed);
    if(this.a === true){
		this.angle += 5*Math.PI/180;
		console.log('BarbAngle');
		console.log(this.barbAngle);
    }
    if(this.d === true){
        this.angle -= 5*Math.PI/180;
    }
    if(this.w === true){
    	this.speed += 0.05;    
    }
    if(this.s === true){
        this.speed -= 0.05;
    }
    if(this.p === true){
    	this.peri.elevatePeriscope();
    }
    if(this.l === true){
    	 this.peri.lowerPeriscope();
    }
    if(this.q === true){
    	this.vertAngle += 0.1;
    }
    if(this.e === true){
    	this.vertAngle -= 0.1;
    }
    this.x -= this.speed*Math.sin(this.angle);
    this.y += this.speed*Math.sin(this.vertAngle);
    this.z -= this.speed*Math.cos(this.angle);
}