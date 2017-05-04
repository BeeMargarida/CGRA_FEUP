var degToRad = Math.PI / 180.0;

function MyTarget(scene, x, y, z){
    CGFobject.call(this,scene);
    this.scene = scene;
    this.x = x; 
    this.y = y;
    this.z = z;
    
    this.cube = new MyUnitCubeQuad(this.scene,0,1,0,1);

    this.app = new CGFappearance(this.scene);
	this.app.loadTexture("../resources/images/target.png");
	this.app.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

    this.initBuffers();
}

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {

    this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        //this.scene.scale(1,1,0.05);
        //this.scene.rotate(90*degToRad,1,0,0);
        this.app.apply();
        this.cube.display();
    this.scene.popMatrix();
}