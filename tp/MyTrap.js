var degToRad = Math.PI / 180.0;

function MyTrap(scene){
    CGFobject.call(this,scene);
    this.scene = scene;
	
    this.prism = new MyPrism(this.scene,4,1);
    

    this.initBuffers();
}

MyTrap.prototype = Object.create(CGFobject.prototype);
MyTrap.prototype.constructor=MyTrap;

MyTrap.prototype.display = function () {
    
    this.scene.pushMatrix();
        this.prism.display();
    this.scene.popMatrix();
  
}