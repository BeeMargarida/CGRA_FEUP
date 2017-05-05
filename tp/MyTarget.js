var degToRad = Math.PI / 180.0;

function MyTarget(scene, x, y, z){
    CGFobject.call(this,scene);
    this.scene = scene;
    this.x = x; 
    this.y = y;
    this.z = z;

    this.explosion = 0;
    
    this.cube = new MyUnitCubeQuad(this.scene,0,1,0,1);

    this.app = new CGFappearance(this.scene);
	this.app.loadTexture("../resources/images/target.png");
	this.app.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

  	this.exp = new CGFappearance(this.scene);
	this.exp.loadTexture("../resources/images/explosion.jpg");
	this.exp.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
    
    this.initBuffers();
}

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor=MyTarget;

MyTarget.prototype.display = function () {

    this.scene.pushMatrix();
        this.scene.translate(this.x, this.y, this.z);
        if(this.explosion !== 0 && this.explosion <= 2){
        	this.exp.apply();
        	this.scene.scale(this.explosion,this.explosion,this.explosion);
        	this.explosion += 1;
        }
        else
        	this.app.apply();
        this.cube.display();
    this.scene.popMatrix();
}

MyTarget.prototype.explode = function () {
	this.cube = new MyLamp(this.scene,8,1);
	this.explosion = 1;
}