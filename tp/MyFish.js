 var degToRad = Math.PI / 180.0;

 function MyFish(scene) {
 	 CGFobject.call(this,scene);

 	this.triangle = new MyEqualSidedTriangle(this.scene,0,1,0,0.866);
    
    this.fishTexture = new CGFappearance(this.scene);
	this.fishTexture.loadTexture("../resources/images/fish.jpg");
	this.fishTexture.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
 };

 MyFish.prototype = Object.create(CGFobject.prototype);
 MyFish.prototype.constructor = MyFish;

 MyFish.prototype.display = function() {
  this.fishTexture.apply();
  //front
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.scene.rotate(-90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.scene.rotate(180*degToRad,1,0,0);
      this.scene.rotate(-90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
    
    //back
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.scene.rotate(90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
    this.scene.pushMatrix();
      this.scene.translate(0,0,5);
      this.scene.rotate(180*degToRad,1,0,0);
      this.scene.rotate(90*degToRad,0,0,1);
      this.triangle.display();
    this.scene.popMatrix();
  
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

 };