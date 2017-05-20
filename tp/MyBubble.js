var degToRad = Math.PI / 180.0;

function MyBubble(scene, x,y,z, angle, vertAngle) {
 	CGFobject.call(this,scene);

 	this.x = x;
 	this.y = y;
 	this.z = z;
 	this.angle = angle;
 	this.vertAngle = vertAngle;

 	this.updateTime = 2;
 	this.scale = 1;

 	this.quad = new MyQuad(this.scene,0,1,0,1);
	//this.materialDefault = new CGFappearance(this.scene);
    this.bubbleTexture = new CGFappearance(this.scene);
	this.bubbleTexture.loadTexture("../resources/images/bubble1.png");
	this.bubbleTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	/*this.bubbleTexture.setAmbient(0,0,0,0);
	this.bubbleTexture.setDiffuse(0, 0, 0, 0);
	this.bubbleTexture.setSpecular(0,0,0,0);*/
};

 MyBubble.prototype = Object.create(CGFobject.prototype);
 MyBubble.prototype.constructor = MyBubble;

 MyBubble.prototype.display = function() {
 	this.bubbleTexture.apply();
 	this.scene.pushMatrix();
 	this.scene.translate(this.x, this.y, this.z);
 	this.scene.rotate(this.angle, 0,1,0);
 	this.scene.rotate(this.vertAngle,1,0,0);
  	this.scene.scale(0.4,0.4,0.4);
   	
  	this.scene.pushMatrix();
		this.scene.scale(this.scale, this.scale, this.scale);
		this.scale -= 0.01;
		
  		this.scene.pushMatrix();
			this.quad.display();
  		this.scene.popMatrix();
  		this.scene.pushMatrix();
  			this.scene.rotate(180*degToRad, 0, 1, 0);
  			this.quad.display();
  		this.scene.popMatrix();

  		this.scene.pushMatrix();
  			this.scene.translate(-5,0,0);
			this.quad.display();
  		this.scene.popMatrix();
  		this.scene.pushMatrix();
  			this.scene.translate(-5,0,0);
  			this.scene.rotate(180*degToRad, 0, 1, 0);
  			this.quad.display();
  		this.scene.popMatrix();

  	this.scene.popMatrix();
  	this.scene.popMatrix();
 };

 MyBubble.prototype.update = function(currTime) {
 	if(this.updateTime > 0){	
		this.x += 0.1*Math.sin(this.angle);
		this.y += 0.1*Math.sin(this.vertAngle);
		this.z += 0.1*Math.cos(this.angle);
		this.updateTime -= 0.15;
 	}
 }