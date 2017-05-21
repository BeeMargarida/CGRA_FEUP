var degToRad = Math.PI / 180.0;

function MyPropeller(scene,x,y,z){
    CGFobject.call(this,scene);
    this.scene = scene;

    this.x = x;
    this.y = y;
    this.z = z;

    this.angle = 0;
    this.speed = 1/25;

    this.propCyl = new MyCylinder(this.scene,8,7);
	this.propCylIn = new MyCylinderInside(this.scene,8,7);
	this.propHel = new MyUnitCubeQuad(this.scene);
	this.middleProp = new MyLamp(this.scene,8,7);

	this.bubbles = [];
	this.bubble = null;

    this.initBuffers();
}

MyPropeller.prototype = Object.create(CGFobject.prototype);
MyPropeller.prototype.constructor=MyPropeller;

MyPropeller.prototype.display = function () {
    this.scene.pushMatrix();
    	this.scene.translate(this.x, this.y, this.z);
        this.scene.scale(0.4,0.4,0.4);
		this.propCyl.display();
		this.propCylIn.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    	this.scene.translate(0,0,0.2);
    	this.scene.translate(this.x, this.y, this.z);
    	this.scene.rotate(this.angle*degToRad,0,0,1);
    	this.scene.scale(0.6,0.2,0.1);
		this.propHel.display();
    this.scene.popMatrix();
	
	this.scene.pushMatrix();
		this.scene.translate(this.x, this.y, this.z);
		this.scene.translate(0,0,0.1);
		this.scene.rotate(180*degToRad,1,0,0);
		this.scene.scale(0.1,0.1,0.1);
		this.middleProp.display();
	this.scene.popMatrix();

	for(var i = 0; i < this.bubbles.length; i++){
		this.bubbles[i].display();
	}
}

MyPropeller.prototype.updateLeft = function (deltaTime, speed) {
	this.angle += deltaTime*speed*2*Math.PI;
}

MyPropeller.prototype.updateRight = function (deltaTime, speed) {
    this.angle -= deltaTime*speed*2*Math.PI;
}

MyPropeller.prototype.update = function (deltaTime, speed){
	this.scene.submarine.prop1.updateLeft(deltaTime,speed);
	this.scene.submarine.prop2.updateRight(deltaTime,speed);

	if(this.speed > 0 && this.bubbles.length < 5){
		this.bubbles.push(new MyBubble(this.scene,this.x,this.y,this.z-0.1,0,0));
	}
	
	for(var i = 0; i < this.bubbles.length; i++){
    	this.bubbles[i].update(deltaTime);
    	if(this.bubbles[i].updateTime <= 0){
    		this.bubbles.splice(i, 1);
    	}
    }
}