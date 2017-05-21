 var degToRad = Math.PI / 180.0;

 function MyFish(scene, x,y) {
 	 CGFobject.call(this,scene);

 	this.triangle = new MyEqualSidedTriangle(this.scene,0,1,0,0.866);
 	this.quad = new MyQuad(this.scene,0,1,0,1);
	
	this.x = x;
	this.y = y;
	this.z = -10;

 	this.lastTime = 0;
    this.firstTime = 0;

    var d = new Date();
	this.startTime = d.getTime();

	this.right = 1;
	
    this.fishTexture = new CGFappearance(this.scene);
	this.fishTexture.loadTexture("../resources/images/fish.jpg");
	this.fishTexture.setTextureWrap('CLAMP_TO_BORDER','CLAMP_TO_BORDER');
 };

 MyFish.prototype = Object.create(CGFobject.prototype);
 MyFish.prototype.constructor = MyFish;

 MyFish.prototype.display = function() {
  this.fishTexture.apply();
  	
  this.scene.pushMatrix();
  	this.scene.translate(this.x,this.y,this.z);
  	this.scene.scale(0.3,0.3,0.3);

  //tail  
  this.scene.pushMatrix();
    this.scene.scale(0.7,1,1);
    this.scene.pushMatrix();
      this.scene.translate(-2,0,5);
      this.scene.rotate(-90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
      this.scene.translate(-2,0,5);
      this.scene.rotate(180*degToRad,1,0,0);
      this.scene.rotate(-90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
   this.scene.popMatrix();

	//front
   this.scene.pushMatrix();
   	this.scene.translate(0,0,5);
   	this.scene.scale(1.3,0.7,1);
   	this.scene.rotate(45*degToRad,0,0,1);
   	this.quad.display();
   this.scene.popMatrix();
	//back
   this.scene.pushMatrix();
   	this.scene.translate(0,0,5);
   	this.scene.scale(1.3,0.7,1);
   	this.scene.rotate(45*degToRad,0,0,1);
   	this.scene.rotate(180*degToRad,0,1,0);
   	this.quad.display();
   this.scene.popMatrix();
  this.scene.popMatrix();
 };

 MyFish.prototype.update = function(currTime) {
 	var deltaTime = currTime - this.startTime;
 	this.startTime = currTime;
 	if(this.firstTime === 0){
 		this.firstTime = 1;
 	}
 	else{
		if(this.x >= 20){
			this.x = -10;
		}
		this.x += 0.15*deltaTime/100;
 	}
}