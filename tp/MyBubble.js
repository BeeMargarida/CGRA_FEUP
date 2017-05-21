var degToRad = Math.PI / 180.0;

function MyBubble(scene, x,y,z, angle, vertAngle) {
 	CGFobject.call(this,scene);

 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.angle = angle;
 	this.vertAngle = vertAngle;

 	var d = new Date();
	this.startTime = d.getTime();

 	this.updateTime = 2;
 	this.scale = 0.5;

 	this.quad = new MyQuad(this.scene,0,1,0,1);
 
    this.bubbleTexture = new CGFappearance(this.scene);
	this.bubbleTexture.loadTexture("../resources/images/bubble1.png");
	this.bubbleTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
};

 MyBubble.prototype = Object.create(CGFobject.prototype);
 MyBubble.prototype.constructor = MyBubble;

 MyBubble.prototype.display = function() {
 	this.bubbleTexture.apply();
 this.scene.pushMatrix();
 this.scene.translate(this.x-2, this.y, this.z+1);
 this.scene.rotate(this.angle, 0,1,0);
 this.scene.rotate(this.vertAngle,1,0,0);
   	
  	this.scene.pushMatrix();
  		this.scene.scale(this.scale, this.scale, this.scale);
		this.quad.display();
  	this.scene.popMatrix();
  	this.scene.pushMatrix();
  		this.scene.rotate(180*degToRad, 0, 1, 0);
  		this.scene.scale(this.scale, this.scale, this.scale);
  		this.quad.display();
  	this.scene.popMatrix();

  	this.scene.pushMatrix();
  		this.scene.translate(2,0,0);
  		this.scene.scale(this.scale, this.scale, this.scale);
		this.quad.display();
  	this.scene.popMatrix();
  	this.scene.pushMatrix();
  		this.scene.translate(2,0,0);
  		this.scene.rotate(180*degToRad, 0, 1, 0);
  		this.scene.scale(this.scale, this.scale, this.scale);
  		this.quad.display();
  this.scene.popMatrix();
  this.scale -= 0.01;

  this.scene.popMatrix();
 };

 MyBubble.prototype.update = function(deltaTime) {
 	if(this.updateTime > 0){	
		this.x += 0.1*Math.sin(this.angle)*deltaTime/100;
		this.y += 0.1*Math.sin(this.vertAngle)*deltaTime/100;
		this.z += 0.1*Math.cos(this.angle)*deltaTime/100;
		this.updateTime -= 0.15;
 	}
 }