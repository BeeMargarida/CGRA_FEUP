function MyClock(scene) {
 	CGFobject.call(this,scene);
	this.scene = scene;

	var d = new Date();
	this.startTime = d.getTime();

	this.cylinder = new MyCylinder(this.scene,12,1);
	this.circle = new MyCircle(this.scene,12);
	
	//pointers
	this.secPointer = new MyClockHand(this.scene,0.9);
	this.minPointer = new MyClockHand(this.scene,0.6);
	this.hourPointer = new MyClockHand(this.scene,0.4);

	this.secPointer.setAngle(90);
	this.minPointer.setAngle(0);
	this.hourPointer.setAngle(-90);

    this.clockAppearance = new CGFappearance(this.scene);
    this.clockAppearance.setDiffuse(0.9,0.9,0.9,1);
    this.clockAppearance.setSpecular(0.9,0.9,0.9,1);
    this.clockAppearance.setShininess(100);
    this.clockAppearance.loadTexture("../resources/images/clock.png");
    
	this.pointerAppearance = new CGFappearance(this.scene);
	this.pointerAppearance.setDiffuse(0,0,0,1);
	this.pointerAppearance.setSpecular(0,0,0,1);
	this.pointerAppearance.setShininess(100);
	
 	this.initBuffers();
 };
 
 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {

 	this.cylinder.display();

 	this.scene.pushMatrix();
 		this.scene.translate(0,0,1);
 		this.clockAppearance.apply();
 		this.circle.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(0,0,1+0.05);
 		this.pointerAppearance.apply();
 		this.secPointer.display();
 	this.scene.popMatrix();

	this.scene.pushMatrix();
		this.scene.translate(0,0,1+0.05);
 		this.pointerAppearance.apply();
 		this.minPointer.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
		this.scene.translate(0,0,1+0.05);
 		this.pointerAppearance.apply();
 		this.hourPointer.display();
 	this.scene.popMatrix();
 };

MyClock.prototype.update = function(currTime) {
	var deltaTime = currTime - this.startTime;
	var secAngle = 6; //360/60
	var minAngle = 0.1; //360/60/60
	var hourAngle = 6 / 720; //360/60/60/12

	if(deltaTime >= 1000){
		this.startTime = currTime;
		if(this.scene.pause == false){
			this.secPointer.setAngle(this.secPointer.angle + secAngle*deltaTime/1000);
			this.minPointer.setAngle(this.minPointer.angle + minAngle*deltaTime/1000);
			this.hourPointer.setAngle(this.hourPointer.angle + hourAngle*deltaTime/1000);
		}
	}
}