var degToRad = Math.PI / 180.0;

function MyTarget(scene, x, y, z){
    CGFobject.call(this,scene);
    this.scene = scene;
    this.x = x; 
    this.y = y;
    this.z = z;
	
    this.indice = 0;

    this.show = true;

    this.explosion = 0;
    
    this.cube = new MyUnitCubeQuad(this.scene,0,1,0,1);
    this.cube2 = null;

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
        this.scene.rotate(-90*degToRad,1,0,0);
        if(this.explosion !== 0 && this.explosion <= 2){
        	this.exp.apply();
        	this.scene.scale(this.explosion,this.explosion,this.explosion);
        	this.explosion += 0.005;
        }
        else
        	this.app.apply();
        if(this.explosion >= 2){
        	this.show = false;
        	this.explosion = 0;
        }
        if(this.cube2 !== null){
        	this.scene.pushMatrix();
        		this.scene.rotate(180*degToRad,1,0,0);
        		this.cube2.display();
        	this.scene.popMatrix();
        }
        this.cube.display();
    this.scene.popMatrix();
}

MyTarget.prototype.explode = function () {
	console.log("explosao"+ this.indice);
	this.cube = new MyLamp(this.scene,8,7);
	this.cube2 = new MyLamp(this.scene,8,7);
	this.explosion = 1;
}