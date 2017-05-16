 function MyFish(scene) {
 	 CGFobject.call(this,scene);

 	this.pyramid = new MyPrism(this.scene,3,1);
 	this.triangle = new MyEqualSidedTriangle(this.scene,0,1,0,1);
 };

 MyFish.prototype = Object.create(CGFobject.prototype);
 MyFish.prototype.constructor = MyFish;

 MyFish.prototype.display = function() {
 
    this.scene.pushMatrix();
      this.scene.translate(3,5,4);
      this.pyramid.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
      this.triangle.display();
    this.scene.popMatrix();

 };